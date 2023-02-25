import { Module } from '@nestjs/common';
import { CustomerModule } from './customers/customer.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, CustomerModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
