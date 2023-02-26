import { Injectable } from '@nestjs/common';
import { UserLogin } from './interfaces/user-login.interface';

@Injectable()
export class LoginService {
  async login(user: UserLogin) {
    return {};
  }
}
