import { Debit } from './../entities/debit.entities';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResultDto, PaginationDto } from '../../helper/pagination.dto';
import { ErrorResultDto } from '../../helper/error-result.dto';
import { DebitCreateDto, DebitUpdateDto } from '../dto/debit.dto';
import { CustomerService } from '../../customer/service/customer.service';
import { isEmpty, set } from 'lodash';

@Injectable()
export class DebitService {
  constructor(
    @InjectRepository(Debit)
    private readonly debitRepository: Repository<Debit>,
    private readonly customerService: CustomerService,
  ) {}

  async findOne(id: number): Promise<Debit> {
    const query = this.debitRepository.createQueryBuilder('debit');
    query.where('debit.id = :id', { id });
    const item = await query
      .innerJoinAndSelect(
        'debit.sourceAccountId',
        'customer',
        'customer.id = debit.sourceAccountId',
      )
      .innerJoinAndSelect(
        'debit.targetAccountId',
        'customer',
        'customer.id = debit.targetAccountId',
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
    const query = this.debitRepository.createQueryBuilder('debit');
    const objFilter = {};
    if (paginationDto?.createdBy) {
      set(objFilter, 'createdBy', Number(paginationDto.createdBy));
    }

    if (!isEmpty(objFilter)) {
      query.where(objFilter);
    }
    const totalCount = await query.getCount();
    const lstData = await query
      .select([
        'debit',
        'sourceInfo.name',
        'sourceInfo.id',
        'sourceInfo.accountNum',
        'targetInfo.name',
        'targetInfo.id',
        'targetInfo.accountNum',
      ])
      .leftJoin('debit.sourceAccount', 'sourceInfo')
      .leftJoin('debit.targetAccount', 'targetInfo')
      .orderBy('debit.id', 'DESC')
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

  async validate(
    createDto: DebitCreateDto | DebitUpdateDto,
  ): Promise<ErrorResultDto> {
    const errorDto: ErrorResultDto = {
      isError: false,
      message: [],
    };

    const sourceAccount = await this.customerService.count(
      createDto.sourceAccountId,
    );
    if (sourceAccount === 0) {
      errorDto.message.push('sourceAccount_not_exist');
    }

    const targetAccount = await this.customerService.count(
      createDto.targetAccountId,
    );
    if (targetAccount === 0) {
      errorDto.message.push('targetAccount_not_exist');
    }

    if (errorDto.message.length > 0) {
      errorDto.isError = true;
    }

    return errorDto;
  }

  async create(createDto: DebitCreateDto): Promise<Debit> {
    const errorResult = await this.validate(createDto);
    if (errorResult.isError) {
      throw new BadRequestException(errorResult);
    }

    const debit = new Debit();
    debit.sourceAccountId = createDto.sourceAccountId;
    debit.targetAccountId = createDto.targetAccountId;
    debit.amount = createDto.amount;
    debit.content = createDto.content;
    debit.dateRemind = new Date(createDto.dateRemind);
    debit.type = createDto.type;
    debit.createdBy = createDto.createdBy;

    try {
      const result = await this.debitRepository.save(debit);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateDto: DebitUpdateDto): Promise<Debit> {
    const item = await this.debitRepository.findOne({ where: { id } });
    if (!item) {
      throw new BadRequestException('Debit not exist');
    }
    const errorResult = await this.validate(updateDto);
    if (!errorResult.isError) {
      throw new BadRequestException(errorResult);
    }

    item.sourceAccountId = updateDto.sourceAccountId;
    item.targetAccountId = updateDto.targetAccountId;
    item.amount = updateDto.amount;
    item.content = updateDto.content;
    item.dateRemind = new Date(updateDto.dateRemind);
    item.type = updateDto.type;

    try {
      const result = await this.debitRepository.save(item);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
