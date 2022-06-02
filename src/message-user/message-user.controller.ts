import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageUserService } from './message-user.service';
import { CreateMessageUserDto } from './dto/create-message-user.dto';
import { UpdateMessageUserDto } from './dto/update-message-user.dto';
import { MessageUser } from './entities/message-user.entity';
import { v4 as uuidv4 } from 'uuid';
@Controller('message')
export class MessageUserController {
  constructor(private readonly messageUserService: MessageUserService) {}

  @Post()
  create(@Body() createMessageUserDto: CreateMessageUserDto) {
    let newMessage = new MessageUser();
    newMessage.id = uuidv4();
    newMessage = { ...newMessage, ...createMessageUserDto };
    return this.messageUserService.create(newMessage);
  }

  @Get()
  findAll() {
    return this.messageUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageUserDto: UpdateMessageUserDto) {
    return this.messageUserService.update(+id, updateMessageUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageUserService.remove(+id);
  }
}
