import { Test, TestingModule } from '@nestjs/testing';
import { MessageUserService } from './message-user.service';
import { MessageUserController } from './message-user.controller';

describe('MessageUserService', () => {
  let service: MessageUserService;
  let controller  : MessageUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageUserService],
      controllers: [MessageUserController],
    }).compile();
    controller = module.get<MessageUserController>(MessageUserController);
    service = module.get<MessageUserService>(MessageUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
