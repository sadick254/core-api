import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdentityDto } from './identity.dto';
import { IdentityService } from './identity.service';

@UseGuards(AuthGuard)
@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}
  @Post('process')
  process(@Body() identityDto: IdentityDto) {
    return this.identityService.process(identityDto);
  }

  @Post('accounts')
  accounts(@Body() identityDto: IdentityDto) {
    return this.identityService.accounts(identityDto);
  }

  @Post('confirm')
  confirm(@Body() identityDto: IdentityDto) {
    return this.identityService.confirm(identityDto);
  }
}
