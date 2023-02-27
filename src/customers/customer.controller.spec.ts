import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './entities/customer.entity';

describe('UserController', () => {
  let customerController: CustomerController;
  let repositoryMock: Repository<CustomerEntity>;

  const mockCustomerEntityFactory = () => ({
    save: jest.fn(entity => entity),
    findOneBy: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
  });

  const mockedCustomer = {
    id: 1,
    email: 'customer@mail.com',
    name: 'John Doe',
    phone: '123456789',
    country: 'Brazil',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        { provide: getRepositoryToken(CustomerEntity), useFactory: mockCustomerEntityFactory },
      ],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    repositoryMock = app.get<Repository<CustomerEntity>>(getRepositoryToken(CustomerEntity));
  });

  it('should create a customer', async () => {
    repositoryMock.save = jest.fn().mockResolvedValue(mockedCustomer);

    const customer = await customerController.create(mockedCustomer);

    expect(customer).toStrictEqual(mockedCustomer);
  });

  it('should return a list of customers', async () => {
    repositoryMock.find = jest.fn().mockResolvedValue([mockedCustomer]);

    const users = await customerController.findAll();

    expect(users).toStrictEqual([mockedCustomer]);
  });

  it('should return a customer by id', async () => {
    repositoryMock.findOneBy = jest.fn().mockResolvedValue(mockedCustomer);

    const customer = await customerController.findOne(1);

    expect(customer).toStrictEqual(mockedCustomer);
  });
});
