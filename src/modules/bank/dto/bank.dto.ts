import {  IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

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
  
  @IsOptional()
  @IsString()
  abbreviations: string;

  @IsOptional()
  @IsString()
  name: string;
}