import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() user: UserCreateDto): Promise<{ token: string }> {
    const newUser = new UserCreateDto(await this.userService.create(user));
    const jwtSecret = this.configService.get('JWT_SECRET') || 'secret';
    const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1d' });
    return { token };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<UserCreateDto[]> {
    return this.userService
      .findAll()
      .then((users) => users.map((user) => new UserCreateDto(user)));
  }
}
