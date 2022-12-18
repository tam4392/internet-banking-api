import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import {
  PaginatedResultDto,
  PaginationDto,
} from 'src/modules/helper/pagination.dto';
import { CreateDto, UpdateDto } from '../dto/bank.dto';
import { Bank } from '../entities/bank.entities';
import { BankService } from '../service/bank.service';

@Controller('api/banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get(':id')
  detail(@Param('id') id: string): Promise<Bank> {
    return this.bankService.findOne(Number(id));
  }

  @Get()
  listbank(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateDto): Promise<Bank> {
    return this.bankService.create(createDto);
  }

  @Patch()
  update(@Body() updateDto: UpdateDto): Promise<Bank> {
    return this.bankService.update(updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    console.log(id)
    return this.bankService.remove(Number(id));
  }
  

  //   @Get()
  //   findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
  //     paginationDto.page = Number(paginationDto.page);
  //     paginationDto.limit = Number(paginationDto.limit);
  //     // return this.actorService.findAll({
  //     //   ...paginationDto,
  //     //   limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
  //     // });
  //   }
}
