import { Exclude } from 'class-transformer';

export class UserCreateDto {
  id?: number;
  email: string;

  @Exclude()
  password: string;

  firstName: string;
  lastName: string;

  constructor(partial: Partial<UserCreateDto>) {
    Object.assign(this, partial);
  }
}
