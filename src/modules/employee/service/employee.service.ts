import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../entities/employees.entities';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
  ) {}

  async findOne(id: number): Promise<Employees> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(createDto: CreateDto): Promise<Employees> {
    const employee = new Employees();
    employee.name = createDto.name;
    employee.email = createDto.email;
    employee.password = createDto.password;

    try {
      const result = await this.employeeRepository.save(employee);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
