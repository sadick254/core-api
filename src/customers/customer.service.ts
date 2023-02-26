import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  async findOne(id: string) {
    return {};
  }

  async findAll() {
    return [];
  }

  async create(customer: Customer) {
    return {};
  }
}
