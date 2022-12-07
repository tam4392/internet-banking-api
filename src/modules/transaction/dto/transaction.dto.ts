import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const TRANSACTION_PAYMENT_TYPE_PAID_RECIPIENTS = 1;
export const TRANSACTION_PAYMENT_TYPE_PAID_SENDER = 3;

export const TRANSACTION_TYPE_RECEIVE = 1;
export const TRANSACTION_TYPE_SEND = 3;
export const TRANSACTION_TYPE_PAY_DEBIT = 5;

export class TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  sendAccountNum: number;

  @IsNumber()
  @IsNotEmpty()
  receiveAccountNum: number;

  @IsString()
  @IsNotEmpty()
  receiveName: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  sendBankId: number;

  @IsNumber()
  @IsNotEmpty()
  receiveBankId: number;

  @IsNumber()
  @IsNotEmpty()
  paymentType: number;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}
