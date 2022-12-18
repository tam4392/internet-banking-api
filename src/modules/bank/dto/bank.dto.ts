import {  IsNotEmpty, IsString, IsNumber, IsEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  abbreviations: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  moneyorder: string;
}

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  
  abbreviations: string;

  name: string;
}