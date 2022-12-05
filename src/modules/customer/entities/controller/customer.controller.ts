import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import {
  PaginatedResultDto,
  PaginationDto,
} from 'src/modules/helper/pagination.dto';
import { CreateDto } from '../dto/customer.dto';
import { Customer } from '../entities/customer.entities';
import { CustomerService } from '../service/customer.service';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  detail(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(Number(id));
  }

  @Post()
  create(@Body() createDto: CreateDto): Promise<Customer> {
    return this.customerService.create(createDto);
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
