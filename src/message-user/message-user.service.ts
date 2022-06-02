import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageUserDto } from './dto/create-message-user.dto';
import { UpdateMessageUserDto } from './dto/update-message-user.dto';
import { MessageUser } from './entities/message-user.entity';

@Injectable()
export class MessageUserService {

  constructor(
    @InjectRepository(MessageUser)
    private messageUserRepository: Repository<MessageUser>,
  ) {}

  async create( newSurvey: Partial<MessageUser>):Promise<MessageUser> {
    return await this.messageUserRepository.save(newSurvey);
  }
  async findAll() {
    const result = await this.messageUserRepository
                .createQueryBuilder("message")
                .getMany();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageUser`;
  }

  update(id: number, updateMessageUserDto: UpdateMessageUserDto) {
    return `This action updates a #${id} messageUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageUser`;
  }
}
