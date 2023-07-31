import { Controller, Inject, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateOtpDto } from './dtos/getOtp.dto';
import { CheckOtpDto } from './dtos/checkOtp.dto';
import { Response, Request } from 'express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Post('getOtp')
  getOtpFromUser(@Body() createOtpDto: CreateOtpDto) {
    return this.authService.getOtp(createOtpDto);
  }

  @Post('checkOtp')
  checkOtpFromUser(
    @Body() checkOtpDto: CheckOtpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.checkOtp(checkOtpDto, response);
  }

  @Get('status')
  async statusLoginUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return response.send(request.currentUser);
  }

  //can be handle from front with removing cookie
  @Post('logout')
  async logoutUser(@Res({ passthrough: true }) response: Response) {
    response.cookie('userToken', null, { maxAge: 1 });
    return;
  }
}
