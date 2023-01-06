import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { MailModule } from '../mail/mail.module';
import { CodeVerifyController } from './controller/code-verify.controller';
import { CodeVerify } from './entities/code-verify.entities';
import { CodeVerifyService } from './service/code-verify.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeVerify]), CustomerModule, MailModule],
  controllers: [CodeVerifyController],
  providers: [CodeVerifyService],
})
export class CodeVerifyModule {}
