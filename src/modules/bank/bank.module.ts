import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entities';
import { BankService } from './service/bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
