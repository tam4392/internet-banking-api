import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuggestAccount } from '../entities/suggest-account.entities';
import { Repository } from 'typeorm';
import { CreateDto, UpdateDto } from '../dto/suggest-account.dto';
import { async } from 'rxjs';

@Injectable()
export class SuggestAccountService {
  constructor(
    @InjectRepository(SuggestAccount)
    private readonly suggestAccountRepository: Repository<SuggestAccount>,
  ) {}

  async findOne(sendAccountNum: number): Promise<SuggestAccount> {
    return this.suggestAccountRepository.findOne({ where: { sendAccountNum } });
  }

  async findAll(sendAccountNum: number): Promise<SuggestAccount[]> {
    return this.suggestAccountRepository.find({ where: { sendAccountNum } });
  }

  async create(createDto: CreateDto): Promise<SuggestAccount> {
    const suggestAccount = new SuggestAccount();
    suggestAccount.sendAccountNum = createDto.sendAccountNum;
    suggestAccount.receiveAccountNum = createDto.receiveAccountNum;
    suggestAccount.name = createDto.name;
    suggestAccount.bankId = createDto.bankId;

    try {
      const result = await this.suggestAccountRepository.save(suggestAccount);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateDto: UpdateDto): Promise<SuggestAccount> {
    const sendAccountNum = updateDto.sendAccountNum;
    
    try {
      await this.suggestAccountRepository.update({ sendAccountNum }, { name: updateDto.name });
      return this.findOne(sendAccountNum);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.suggestAccountRepository.delete(id);
  }
}
