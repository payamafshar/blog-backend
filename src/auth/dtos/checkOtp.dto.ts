import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CheckOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
