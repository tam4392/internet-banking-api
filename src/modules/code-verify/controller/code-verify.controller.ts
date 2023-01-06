import { BadRequestException, Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { get } from 'lodash';
import { MailService } from 'src/modules/mail/service/mail.service';
import { CustomerService } from '../../customer/service/customer.service';
import { CodeVerifyService } from '../service/code-verify.service';

@Controller('api/code-verify')
export class CodeVerifyController {
  constructor(
    private readonly codeService: CodeVerifyService,
    private readonly customerService: CustomerService,
    private readonly mailService: MailService,
  ) {}

  @Post('/check')
  async verify(@Body() data: any): Promise<any> {
    const itemCode = await this.codeService.findByCodeAndCId(
      data?.cId,
      data?.code,
    );
    if (!itemCode) {
      throw new BadRequestException();
    } else if (new Date().getTime() > itemCode.expired.getTime()) {
      throw new BadRequestException({ messageError: 'OTP expired' });
    } else {
      await this.codeService.remove(itemCode.id);
    }

    return { success: 'success' };
  }

  @Post()
  async create(@Body() createDto: any): Promise<any> {
    const cusId = createDto?.id;
    if (!cusId) {
      throw new BadRequestException();
    }
    const codeItem = await this.codeService.create(Number(cusId));
    const cusInfo = await this.customerService.findOne(codeItem.cId);
    await this.mailService.sendUserOtp(
      { email: cusInfo.email, name: cusInfo.name },
      codeItem.code,
    );

    return { success: 'success' };
  }
}
