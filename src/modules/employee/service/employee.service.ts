import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../entities/employees.entities';
import { Repository } from 'typeorm';
import { CreateDto, UpdateDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
  ) {}

  async findOne(id: number): Promise<Employees> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Employees> {
    return this.employeeRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<Employees[]> {
    return this.employeeRepository.find();
  }

  async create(createDto: CreateDto): Promise<Employees> {
    const employee = new Employees();
    employee.name = createDto.name;
    employee.email = createDto.email;
    employee.password = createDto.password;
    employee.phone = createDto.phone;
    employee.type = createDto.type;

    try {
      const result = await this.employeeRepository.save(employee);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateDto: UpdateDto): Promise<Employees> {
    const employee = new Employees();
    const id = updateDto.id;
    employee.name = updateDto.name;
    employee.email = updateDto.email;
    employee.password = updateDto.password;
    employee.phone = updateDto.phone;
    employee.type = updateDto.type;

    try {
      await this.employeeRepository.update(id, employee);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<Employees> {
    try {
      const employees = await this.findOne(id);
      employees.refreshToken = refreshToken;
      await this.employeeRepository.update(id, employees);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }
}
