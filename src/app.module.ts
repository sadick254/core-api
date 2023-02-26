import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customers/customer.module';
import { IdentityModule } from './identity/identity.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: process.env.NODE_ENV === 'test',
    }),
    UserModule,
    CustomerModule,
    LoginModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
