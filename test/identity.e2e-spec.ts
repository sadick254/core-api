import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('IdentityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('confirms a bvn', () => {
    return request(app.getHttpServer())
      .post('/identity/process')
      .send({ bvn: '12345678901'})
      .expect(200)
      .expect('process');
  });

  it('confirms a nuban', () => {
    return request(app.getHttpServer())
      .post('/identity/process')
      .send({ nuban: '12345678901', bvn: '12345678901'})
      .expect(200)
      .expect('process');
  });

  it('gets a list of accounts for a bvn', () => {
    return request(app.getHttpServer())
      .post('/identity/accounts')
      .send({ bvn: '12345678901'})
      .expect(200)
      .expect('accounts');
  });

});
