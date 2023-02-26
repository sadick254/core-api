import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  const mockUser = {
    email: 'test@mail.com',
    password: 'password',
    firstName: 'test',
    lastName: 'user',
  };

  beforeEach(async () => {
    const UserServiceMock = {
      create: jest.fn().mockResolvedValue({ id: 1, ...mockUser }), 
      findAll: jest.fn().mockResolvedValue([{ id: 1, ...mockUser }]),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(UserServiceMock)
      .compile();

    userController = app.get<UserController>(UserController);
  });

  it('should create a user', async () => {
    const user = await userController.create(mockUser);
    expect(user).toStrictEqual(new UserCreateDto({ id: 1, ...mockUser }));
  });

  it('should return a list of users', async () => {
    const users = await userController.findAll();
    expect(users).toStrictEqual([
      new UserCreateDto({
        id: 1,
        ...mockUser,
      }),
    ]);
  });
});
