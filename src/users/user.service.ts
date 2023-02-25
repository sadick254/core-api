import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UserService {
  async create(user: User) {
    return {};
  }

  async findAll() {
    return [];
  }
}
