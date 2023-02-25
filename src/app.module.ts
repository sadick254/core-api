import { Module } from '@nestjs/common';
import { CustomerModule } from './customers/customer.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
