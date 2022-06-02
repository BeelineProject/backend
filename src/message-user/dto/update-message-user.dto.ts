import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageUserDto } from './create-message-user.dto';

export class UpdateMessageUserDto extends PartialType(CreateMessageUserDto) {}
