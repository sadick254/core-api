import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createUser, mockedUser } from './helpers';

describe('LoginController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.DB_NAME = 'login.db';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should login successfully', async () => {
    const { token } = await createUser(mockedUser, app);

    return request(app.getHttpServer())
      .post('/login')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test@mail.com', password: 'password' })
      .expect(200)
      .then(({ body }) => {
        expect(body).toStrictEqual({ token: expect.any(String) });
      });
  });

  it('should fail to login with wrong credentials', async () => {
    const { token } = await createUser(mockedUser, app);

    return request(app.getHttpServer())
      .post('/login')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test@mail.com', password: 'wrongpassword' })
      .expect(401)
      .expect({ statusCode: 401, message: 'Invalid password' });
  });

});
