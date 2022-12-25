import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDto { 
    @IsNotEmpty()
    @IsInt()
    sendAccountNum: number;

    @IsNotEmpty()
    @IsInt()
    receiveAccountNum: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    bankId: number;
}

export class UpdateDto {
    @IsNotEmpty()
    @IsNumber()
    sendAccountNum: number;
  
    @IsOptional()
    @IsString()
    name: string;
  }