import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { PaginatedResultDto, PaginationDto } from '../../helper/pagination.dto';
import { DebitCreateDto, DebitUpdateDto } from '../dto/debit.dto';
import { Debit } from '../entities/debit.entities';
import { DebitService } from '../service/debit.service';

@Controller('api/debit')
export class DebitController {
  constructor(private readonly debitService: DebitService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.debitService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Debit> {
    return this.debitService.findOne(Number(id));
  }

  @Post()
  create(@Body() createDto: DebitCreateDto): Promise<Debit> {
    return this.debitService.create(createDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: DebitUpdateDto,
  ): Promise<Debit> {
    return this.debitService.update(Number(id), updateDto);
  }
}
