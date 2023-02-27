import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Post()
  async create(@Body() customer: CustomerCreateDto) {
    return this.customerService.create(customer);
  }
}
