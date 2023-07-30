import { IsNotEmpty, IsNumber } from 'class-validator';

export class CheckOtpDto {
  @IsNotEmpty()
  @IsNumber()
  mobile: number;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
