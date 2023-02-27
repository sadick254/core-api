import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
