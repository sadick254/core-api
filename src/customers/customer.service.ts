import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Customer } from './interfaces/customer.interface';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
  ) {}

  async findOne(id: number) {
    return this.customerRepository.findOneBy({id});
  }

  async findAll() {
    return this.customerRepository.find();
  }

  async create(customer: Customer) {
    return this.customerRepository.save(customer);
  }
}
