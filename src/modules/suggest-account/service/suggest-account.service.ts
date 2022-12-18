import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuggestAccount } from '../entities/suggest-account.entities';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/suggest-account.dto';

@Injectable()
export class SuggestAccountService {
  constructor(
    @InjectRepository(SuggestAccount)
    private readonly suggestAccountRepository: Repository<SuggestAccount>,
  ) {}

  async findOne(id: number): Promise<SuggestAccount> {
    return this.suggestAccountRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<SuggestAccount[]> {
    return this.suggestAccountRepository.find();
  }

  async create(createDto: CreateDto): Promise<SuggestAccount> {
    const suggestAccount = new SuggestAccount();

    try {
      const result = await this.suggestAccountRepository.save(suggestAccount);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.suggestAccountRepository.delete(id);
  }
}
