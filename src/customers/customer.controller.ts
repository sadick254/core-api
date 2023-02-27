import { Body, Controller, Get, Param, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';

@UseGuards(AuthGuard) 
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
  async create(@Body() customer: CustomerCreateDto, @Headers('authorization') bearerToken: string) {
    const token = bearerToken.split(' ')[1];
    console.log(token);
    return this.customerService.create(customer);
  }
}
