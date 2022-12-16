
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { MailService } from '../service/mail.service';
import { MailUser } from '../user/user.entity';

@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() user: MailUser): Promise<void> {
    return this.mailService.sendUserOtp(user);
  }
}
