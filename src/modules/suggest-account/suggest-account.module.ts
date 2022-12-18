import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestAccountController } from './controller/suggest-account.controller';
import { SuggestAccount } from './entities/suggest-account.entities';
import { SuggestAccountService } from './service/suggest-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuggestAccount])],
  controllers: [SuggestAccountController],
  providers: [SuggestAccountService],
  exports: [SuggestAccountService],
})
export class SuggestAccountModule {}
