import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser({ email: string, password: string } ): Promise<any> {
    return null;
  }

  async login({ email: string, password: string }) {
    return null;
  }

  async register(user: any) {
    return null;
  }

  async logout(user: any) {
    return null;
  }
}
