import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';


describe('LoginController', () => {
  let loginController: LoginController;
  let repositoryMock: Repository<UserEntity>;

  const mockerUserEntityFactory = () => ({
    findOneBy: jest.fn(entity => entity),
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [LoginController],
      providers: [LoginService, { provide: getRepositoryToken(UserEntity), useFactory: mockerUserEntityFactory }],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
    repositoryMock = app.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('return a token on valid password', async () => {
    const hash = bcrypt.hashSync('password', 10);
    repositoryMock.findOneBy = jest.fn().mockResolvedValue({ password: hash, id: 1});

    const user = await loginController.login({ email: '', password: 'password' });

    expect(user).toEqual({ token: expect.any(String) });
  });

  it('should throw an error on invalid password', async () => {
    const hash = bcrypt.hashSync('password', 10);
    repositoryMock.findOneBy = jest.fn().mockResolvedValue({ password: hash, id: 1});

    await expect(loginController.login({ email: '', password: 'wrong' })).rejects.toThrowError();
  });
});
