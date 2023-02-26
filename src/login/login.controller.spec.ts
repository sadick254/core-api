import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });

  it('should create a user', async () => {
    const user = await loginController.login({ email: '', password: '' });
    expect(user).toStrictEqual({});
  });
});
