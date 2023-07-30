import { Request, Response } from 'express';
import { UserEntity } from 'src/entities/user.entity';
import {
  CheckOtpParams,
  CreateOtpParam,
  CreateOtpResponse,
} from 'src/utils/types';

export interface IAuthService {
  getOtp(createOtpParam: CreateOtpParam): Promise<CreateOtpResponse>;

  checkOtp(checkOtpParams: CheckOtpParams, response: Response): void;
}
