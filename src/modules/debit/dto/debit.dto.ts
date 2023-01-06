import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export const DEBIT_STATUS_NOT_PAID = 1;
export const DEBIT_STATUS_PAID = 3;
export const DEBIT_TYPE_COLLECT = 1; //thu nợ
export const DEBIT_TYPE_REMINDER = 3; //nhắc  đòi nợ

export class DebitCreateDto {
  @IsNumber()
  @IsNotEmpty()
  sourceAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  targetAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  dateRemind: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}

export class DebitUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  sourceAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  targetAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  dateRemind: Date;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}
