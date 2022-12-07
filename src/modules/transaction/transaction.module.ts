import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from '../bank/bank.module';
import { CustomerModule } from '../customer/customer.module';
import { TransactionController } from './controller/transaction.controller';
import { Transaction } from './entities/transaction.entities';
import { TransactionService } from './service/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    CustomerModule,
    BankModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
