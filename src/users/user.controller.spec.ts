import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('should create a user', async () => {
    const user = await userController.create({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
    expect(user).toStrictEqual({});
  });

  it('should return a list of users', async () => {
    const users = await userController.findAll();
    expect(users).toStrictEqual([]);
  });
});
