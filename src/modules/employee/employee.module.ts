import { Module } from '@nestjs/common';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './entities/employees.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Employees])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
