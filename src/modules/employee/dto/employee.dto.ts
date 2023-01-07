import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsNumberString, IsString } from 'class-validator';

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

  @IsNumberString()
  phone: string;

  @IsNumber()
  type: number;
}

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumberString()
  phone: string;

  @IsNumber()
  type: number;
}
