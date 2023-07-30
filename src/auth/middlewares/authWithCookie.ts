import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { parseCookies } from 'src/utils/helper';
import { UserEntity } from 'src/entities/user.entity';
import { Repositories } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { IJwtVerify } from 'src/utils/interfaces';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserEntity;
    }
  }
}

@Injectable()
export default class AuthWithCookie implements NestMiddleware {
  constructor(
    @Inject(Repositories.USER)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const parsedCookie = parseCookies(req);

    if (!parsedCookie.userToken) {
      return next(new BadRequestException('لطفا وارد حساب کاربری خود شوید'));
    }
    const token = cookieParser.signedCookie(
      parsedCookie.userToken,
      this.configService.get('COOKIE_KEY'),
    );

    console.log(token);
    if (!token)
      return next(new UnauthorizedException('لطفا وارد حساب کاربری خود شوید '));

    const { id } = jwt.verify(
      token,
      this.configService.get('JWT_SECRET'),
    ) as IJwtVerify;

    if (!id) return next('لطفا وارد حساب کاربری خود شوید');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) next(new UnauthorizedException('لطفا وارد حساب خود شوید'));
    req.currentUser = user;
    return next();
  }
}
