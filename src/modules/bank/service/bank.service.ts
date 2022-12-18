import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entities/bank.entities';
import { CreateDto, UpdateDto } from '../dto/bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async findOne(id: number): Promise<Bank> {
    return this.bankRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }
  async count(id: number): Promise<number> {
    return this.bankRepository.count({ where: { id } });
  }

  async create(createDto: CreateDto): Promise<Bank> {
    const bank = new Bank();
    bank.abbreviations = createDto.abbreviations;
    bank.name = createDto.name;
    bank.moneyorder = createDto.moneyorder;

    try {
      const result = await this.bankRepository.save(bank);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateDto: UpdateDto): Promise<Bank> {
    const bank = new Bank();
    const id = updateDto.id;
    bank.abbreviations = updateDto.abbreviations;
    bank.name = updateDto.name;
    
    try {
      await this.bankRepository.update(id, bank);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }
}
