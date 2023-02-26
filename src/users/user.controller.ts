import { Body, Controller, Get, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserCreateDto> {
    return this.userService.create(user).then((user) => new UserCreateDto(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<UserCreateDto[]> {
    return this.userService.findAll().then((users) => users.map((user) => new UserCreateDto(user)));
  }
}
