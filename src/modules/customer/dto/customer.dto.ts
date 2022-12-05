import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
