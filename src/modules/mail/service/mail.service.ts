import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailUser } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOtp(user: MailUser, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Do not share your OTP!',
      template: './otp',
      context: {
        name: user.name,
        otp,
      },
    });
  }
}
