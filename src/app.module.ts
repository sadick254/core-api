import { Module } from '@nestjs/common';
import { CustomerModule } from './customers/customer.module';
import { IdentityModule } from './identity/identity.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, CustomerModule, LoginModule, IdentityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
