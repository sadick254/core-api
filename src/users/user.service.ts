import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User) {
    user.password = bcrypt.hashSync(user.password, 10);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }
}
