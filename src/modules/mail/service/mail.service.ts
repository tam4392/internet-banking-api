import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailUser } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOtp(user: MailUser) {
    // https://notiz.dev/blog/send-emails-with-nestjs
    // https://dev.to/krishnakurtakoti/otp-genertion-and-verification-using-speakeasy-nest-js-and-mongodb-4nam
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Do not share your OTP!',
      template: './otp', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        otp,
      },
    });
  }
}
