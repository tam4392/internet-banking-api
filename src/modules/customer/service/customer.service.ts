import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entities';
import { Repository } from 'typeorm';
import { CreateDto, UpdateDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async findByUserName(userName: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { userName } });
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async create(createDto: CreateDto): Promise<Customer> {
    const customer = new Customer();
    customer.accountNum = createDto.accountNum;
    customer.accountBalance = createDto.accountBalance;
    customer.name = createDto.name;
    customer.email = createDto.email;
    customer.userName = createDto.userName;
    customer.password = createDto.password;
    customer.phone = createDto.phone;
    customer.dob = createDto.dob;
    customer.address = createDto.address;
    customer.bankId = createDto.bankId;
    delete customer.id;

    try {
      const result = await this.customerRepository.save(customer);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateDto: UpdateDto): Promise<Customer> {
    const customer = new Customer();
    const id = updateDto.id;
    customer.accountNum = updateDto.accountNum;
    customer.accountBalance = updateDto.accountBalance;
    customer.name = updateDto.name;
    customer.email = updateDto.email;
    customer.userName = updateDto.userName;
    customer.password = updateDto.password;
    customer.phone = updateDto.phone;
    customer.dob = updateDto.dob;
    customer.address = updateDto.address;
    customer.bankId = updateDto.bankId;

    try {
      const result = await this.customerRepository.update(id, customer);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<object> {
    const deleteResponse = await this.customerRepository.delete(id);
    if (!deleteResponse.affected) {
      return {
        succeed: false,
        msg: `Customer ${id} wasn't successfully deleted.`,
      };
    } else {
      return {
        succeed: true,
        msg: `Customer id:${id} was successfully deleted.`,
      };
    }
  }

  async count(id: number): Promise<number> {
    return this.customerRepository.count({ where: { id } });
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      customer.refreshToken = refreshToken;
      await this.customerRepository.update(id, customer);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }
}
