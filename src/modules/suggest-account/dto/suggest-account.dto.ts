import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto { 
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    sendAccountNum: number;

    @IsNotEmpty()
    @IsInt()
    receiveAccountNum: number;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    bankId: number;
}