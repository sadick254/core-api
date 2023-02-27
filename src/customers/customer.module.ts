import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), ConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
