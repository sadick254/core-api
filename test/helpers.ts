import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const createUser = (user: { [key: string]: any }, app: INestApplication) => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .then(({ body }) => body);
  }

export const mockedUser = {
    email: 'test@mail.com',
    password: 'password',
    firstName: 'test',
    lastName: 'user',
}
