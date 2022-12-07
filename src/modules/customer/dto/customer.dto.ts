import { IsDate, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString ,Min, MinLength} from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  accountNum: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  accountBalance: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  phone: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsInt()
  bankId: number;
}

export class UpdateDto {

  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  accountNum: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  accountBalance: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(11)
  phone: string;

  @IsOptional()
  @IsDate()
  dob: Date;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsInt()
  bankId: number;
}
