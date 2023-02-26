import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@mail.com',
        password: 'password',
        firstName: 'test',
        lastName: 'user',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty('token');
      });
  });

  it('should fetch all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: 1, email: 'test@mail.com', firstName: 'test', lastName: 'user' },
      ]);
  });
});
