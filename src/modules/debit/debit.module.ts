import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debit } from './entities/debit.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Debit])],
  controllers: [],
  providers: [],
})
export class DebitModule {}
