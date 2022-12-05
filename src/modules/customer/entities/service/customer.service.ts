import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entities';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly employeeRepository: Repository<Customer>,
  ) {}

  async findOne(id: number): Promise<Customer> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(createDto: CreateDto): Promise<Customer> {
    const employee = new Customer();
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
