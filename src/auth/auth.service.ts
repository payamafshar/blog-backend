import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { Repositories } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { IAuthService } from './auth';
import {
  AuthenticatedRequest,
  CheckOtpParams,
  CreateOtpParam,
  CreateOtpResponse,
} from 'src/utils/types';
import { randomNumberGenerator } from 'src/utils/helper';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Repositories.USER)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  async getOtp(createOtpParam: CreateOtpParam): Promise<void> {
    const { email } = createOtpParam;

    const otpCode = randomNumberGenerator();
    const otpExpiresin = new Date().getTime() + 90000;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      const createdOtp = this.userRepository.create({
        email,
        otpCode,
        otpExpiresin,
      });

      const user = await this.userRepository.save(createdOtp);

      return await this.mailService.sendUserConfirmation(user);
    }
    await this.userRepository.update({ email }, { otpCode, otpExpiresin });
    return await this.mailService.sendUserConfirmation(user);
  }

  async checkOtp(checkOtpParams: CheckOtpParams, response: Response) {
    const { email, code } = checkOtpParams;

    const user = await this.userRepository.findOne({ where: { email } });

    const now = new Date().getTime();

    if (+now > +user.otpExpiresin)
      throw new BadRequestException('کد شما منقضی شده است');

    if (+user.otpCode != +code)
      throw new BadRequestException('کد وارد شده صحیح نمی باشد');

    const token = jwt.sign(
      { id: user.id },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: this.configService.get('JWT_EXPIRESIN'),
      },
    );

    response.cookie('userToken', token, {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
      sameSite: 'none',
      signed: true,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 360, // 360days
      domain: this.configService.get('DOMAIN'),
    });

    return;
  }
}
