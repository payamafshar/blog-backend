import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
