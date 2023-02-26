import { Injectable } from '@nestjs/common';
import { IdentityRequest } from './interfaces/identity-request.interface';

@Injectable()
export class IdentityService {
  process(identityRequest: IdentityRequest): string {
    return 'process';
  }

  accounts(identityRequest: IdentityRequest): string {
    return 'accounts';
  }
}
