import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import {
  PaginatedResultDto,
  PaginationDto,
} from 'src/modules/helper/pagination.dto';
import { CreateDto, UpdateDto } from '../dto/employee.dto';
import { Employees } from '../entities/employees.entities';
import { EmployeeService } from '../service/employee.service';

@Controller('api/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  detail(@Param('id') id: string): Promise<Employees> {
    return this.employeeService.findOne(Number(id));
  }

  @Get()
  list(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateDto): Promise<Employees> {
    return this.employeeService.create(createDto);
  }

  @Patch()
  update(@Body() updateDto: UpdateDto): Promise<Employees> {
    return this.employeeService.update(updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(Number(id));
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
