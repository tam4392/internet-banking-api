import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from './config/orm';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';
import { SuggestAccountModule } from './modules/suggest-account/suggest-account.module';
import { BankModule } from './modules/bank/bank.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DebitModule } from './modules/debit/debit.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(configOrm),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
    }),
    EmployeeModule,
    CustomerModule,
    SuggestAccountModule,
    BankModule,
    TransactionModule,
    DebitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
