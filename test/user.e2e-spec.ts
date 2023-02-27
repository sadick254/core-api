import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createUser, mockedUser } from './helpers';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.DB_NAME = 'users.db';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a user', () => {
    return createUser(mockedUser, app)
      .then((resp) => {
        expect(resp).toStrictEqual({ token: expect.any(String) });
      });
  });

  it('should fail to get users when not authenticated', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(403)
      .expect({ statusCode: 403, message: 'Forbidden resource', error: 'Forbidden' });
  });

  it('should fetch all users when authenticated', async () => {
    const { token } = await createUser(mockedUser, app);

    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect([
        { id: 1, email: 'test@mail.com', firstName: 'test', lastName: 'user' },
      ]);
  });
});
