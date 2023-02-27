import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserLogin } from './interfaces/user-login.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}
  async login(user: UserLogin): Promise<{ token: string }> {
    const userRecord = await this.userRepository.findOneBy({ email: user.email });
    if (!userRecord) {
      throw new Error('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(user.password, userRecord.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const jwtSecret = this.configService.get('JWT_SECRET') || 'secret';
    const token = jwt.sign({ id: userRecord.id }, jwtSecret, { expiresIn: '1d' });
    return { token };
  }
}
