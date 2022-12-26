import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entities';
import { PaginatedResultDto, PaginationDto } from '../../helper/pagination.dto';
import { TransactionCreateDto } from '../dto/transaction.dto';
import { ErrorResultDto } from '../../helper/error-result.dto';
import { BankService } from '../../bank/service/bank.service';
import { CustomerService } from '../../customer/service/customer.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly customerService: CustomerService,
    private readonly bankService: BankService,
  ) {}

  async findOne(id: number): Promise<Transaction> {
    const query = this.transactionRepository.createQueryBuilder('transaction');
    query.where('transaction.id = :id', { id });
    const item = await query
      .innerJoinAndSelect(
        'transaction.sendAccountNum',
        'customer',
        'customer.id = transaction.sendAccountNum',
      )
      .innerJoinAndSelect(
        'transaction.receiveAccountNum',
        'customer',
        'customer.id = transaction.receiveAccountNum',
      )
      .innerJoinAndSelect(
        'transaction.sendBankId',
        'bank',
        'bank.id = transaction.sendBankId',
      )
      .innerJoinAndSelect(
        'transaction.receiveBankId',
        'bank',
        'bank.id = transaction.receiveBankId',
      )
      .getOne();

    return item;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const query = this.transactionRepository.createQueryBuilder('transaction');

    const totalCount = await query.getCount();
    const lstData = await query
      .innerJoinAndSelect(
        'transaction.sendAccountNum',
        'customer',
        'customer.id = transaction.sendAccountNum',
      )
      .innerJoinAndSelect(
        'transaction.receiveAccountNum',
        'customer',
        'customer.id = transaction.receiveAccountNum',
      )
      .innerJoinAndSelect(
        'transaction.sendBankId',
        'bank',
        'bank.id = transaction.sendBankId',
      )
      .innerJoinAndSelect(
        'transaction.receiveBankId',
        'bank',
        'bank.id = transaction.receiveBankId',
      )
      .orderBy('transaction.id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: lstData,
    };
  }

  async validate(createDto: TransactionCreateDto): Promise<ErrorResultDto> {
    const errorDto: ErrorResultDto = {
      isError: false,
      message: [],
    };

    const countSender = await this.customerService.count(
      createDto.sendAccountNum,
    );
    if (countSender === 0) {
      errorDto.message.push('sendAccountNum_not_exist');
    }

    const countReceive = await this.customerService.count(
      createDto.receiveAccountNum,
    );
    if (countReceive === 0) {
      errorDto.message.push('receiveAccountNum_not_exist');
    }

    const countBankSend = await this.bankService.count(createDto.sendBankId);
    if (countBankSend === 0) {
      errorDto.message.push('sendBankId_not_exist');
    }

    const countBankReceive = await this.bankService.count(
      createDto.receiveBankId,
    );
    if (countBankReceive === 0) {
      errorDto.message.push('receiveBankId_not_exist');
    }

    if (errorDto.message.length > 0) {
      errorDto.isError = true;
    }

    return errorDto;
  }

  async create(createDto: TransactionCreateDto): Promise<Transaction> {
    const errorResult = await this.validate(createDto);
    if (!errorResult.isError) {
      throw new BadRequestException(errorResult);
    }

    const transaction = new Transaction();
    transaction.sendAccountNum = createDto.sendAccountNum;
    transaction.receiveAccountNum = createDto.receiveAccountNum;
    transaction.receiveName = createDto.receiveName;
    transaction.amount = createDto.amount;
    transaction.content = createDto.content;
    transaction.sendBankId = createDto.sendBankId;
    transaction.receiveBankId = createDto.receiveBankId;
    transaction.paymentType = createDto.paymentType;
    transaction.type = createDto.type;

    try {
      const result = await this.transactionRepository.save(transaction);
      return result;
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException();
    }
  }
}
