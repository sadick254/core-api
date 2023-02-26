import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a customer', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({ email: '', name: '', phone: '', address: '' })
      .expect(201)
      .expect({});
  });

  it('should fetch all customers', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([]);
  });

  it('should fetch a customer by id', () => {
    return request(app.getHttpServer())
      .get('/customers/1')
      .expect(200)
      .expect({});
  });
});
