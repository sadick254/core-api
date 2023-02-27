import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.DB_NAME = 'customers.db';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const customer = {
    email: 'customer@mail.com',
    name: 'John Doe',
    phone: '123456789',
    country: 'Kenya',
  };

  const createCustomer = (customer, app) => {
    return request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .then(({ body }) => body);
  };

  it('should create a customer', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201)
      .expect({ id: 1, ...customer });
  });

  it('should fetch all customers', async () => {
    await createCustomer(customer, app)

    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([{ id: 1, ...customer }]);
  });

  it('should fetch a customer by id', () => {
    return request(app.getHttpServer())
      .get('/customers/1')
      .expect(200)
      .expect({});
  });
});
