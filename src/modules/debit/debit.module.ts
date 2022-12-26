import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debit } from './entities/debit.entities';
import { DebitService } from './service/debit.service';
import { CustomerModule } from '../customer/customer.module';
import { DebitController } from './controller/debit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Debit]), CustomerModule],
  controllers: [DebitController],
  providers: [DebitService],
})
export class DebitModule {}
