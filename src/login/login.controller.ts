import { Controller, HttpCode, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(userLogin: UserLoginDto) {
    return this.loginService.login(userLogin);
  }
}
