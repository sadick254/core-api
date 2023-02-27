import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() userLogin: UserLoginDto) {
    return this.loginService.login(userLogin).catch((err) => {
      throw new HttpException(err.message, 401);
    });
  }
}
