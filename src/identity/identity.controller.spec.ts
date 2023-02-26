import { Test, TestingModule } from '@nestjs/testing';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';

describe('UserController', () => {
  let identityController: IdentityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [IdentityService],
    }).compile();

    identityController = app.get<IdentityController>(IdentityController);
  });

  it('should validate a bvn', async () => {
    const identityRequest = {
      bvn: '12345678901',
    };
    const identity = await identityController.process(identityRequest);
    expect(identity).toStrictEqual('process');
  });

  it('should return a list of accounts for a bvn', async () => {
    const identityRequest = {
      bvn: '12345678901',
    };
    const accounts = await identityController.accounts(identityRequest);
    expect(accounts).toStrictEqual('accounts');
  });
});
