import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { PaginatedResultDto, PaginationDto } from '../../helper/pagination.dto';
import { TransactionCreateDto } from '../dto/transaction.dto';
import { Transaction } from '../entities/transaction.entities';
import { TransactionService } from '../service/transaction.service';

@Controller('api/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':id')
  detail(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findOne(Number(id));
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.transactionService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post()
  create(@Body() createDto: TransactionCreateDto): Promise<Transaction> {
    return this.transactionService.create(createDto);
  }
}
