import { Module } from '@nestjs/common';
import { MessageUserService } from './message-user.service';
import { MessageUserController } from './message-user.controller';
import { MessageUser } from './entities/message-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageUser])],
  controllers: [MessageUserController],
  providers: [MessageUserService]
})
export class MessageUserModule {}
