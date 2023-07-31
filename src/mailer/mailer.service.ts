import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { MailerService as MailService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailService: MailService) {}

  async sendUserConfirmation(user: UserEntity) {
    console.log(user.otpCode);
    const url = `http://localhost:3001/auth/checkOtp?email=${
      user.email
    }&code=${+user.otpCode}`;

    await this.mailService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        email: user.email,
        url,
      },
    });
  }
}
