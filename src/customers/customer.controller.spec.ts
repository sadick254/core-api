import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('UserController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  it('should create a customer', async () => {
    const user = await customerController.create({ email: '', name: '', phone: '', address: '' });
    expect(user).toStrictEqual({});
  });

  it('should return a list of customers', async () => {
    const users = await customerController.findAll();
    expect(users).toStrictEqual([]);
  });

  it('should return a customer by id', async () => {
    const user = await customerController.findOne('1');
    expect(user).toStrictEqual({});
  });

});
