import { Test, TestingModule } from '@nestjs/testing';
import { MessageUserController } from './message-user.controller';
import { MessageUserService } from './message-user.service';

describe('MessageUserController', () => {
  let controller: MessageUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageUserController],
      providers: [MessageUserService],
    }).compile();

    controller = module.get<MessageUserController>(MessageUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
