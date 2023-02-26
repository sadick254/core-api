import { Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(user: UserCreateDto) {
    return this.userService.create(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
