import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { CustomerModule } from './customers/customer.module';
import { IdentityModule } from './identity/identity.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'okra.sqlite',
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    CustomerModule,
    LoginModule,
    IdentityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
