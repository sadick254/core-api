import { Controller, HttpCode, Post } from '@nestjs/common';
import { IdentityRequest } from './dto/identity-request.dto';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}
  @HttpCode(200)
  @Post('process')
  async process(identityRequest: IdentityRequest) {
    return this.identityService.process(identityRequest);
  }

  @HttpCode(200)
  @Post('accounts')
  async accounts(identityRequest: IdentityRequest) {
    return this.identityService.accounts(identityRequest);
  }
}
