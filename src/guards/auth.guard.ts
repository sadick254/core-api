import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtSecret = this.configService.get('JWT_SECRET') || 'secret';
    const token = request.headers.authorization?.split(' ')[1];
    try {
      jwt.verify(token, jwtSecret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
