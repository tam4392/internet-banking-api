import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [],
  providers: [],
})
export class TransactionModule {}
