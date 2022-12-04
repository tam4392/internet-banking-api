import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestAccount } from './entities/suggest-account.entities';

@Module({
  imports: [TypeOrmModule.forFeature([SuggestAccount])],
  controllers: [],
  providers: [],
})
export class SuggestAccountModule {}
