import { Injectable } from '@nestjs/common';
import { CrudService } from '../generics/crud';
import { User, UserRoleEnum } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    user.role = UserRoleEnum.user;
    return this.userRepository.save(user);
  }

  async getUserByUserNameOrEmail(
    username: string,
    email: string,
  ): Promise<User> {
    console.log('in getUserBy....');
    const user = await this.userRepository
                .createQueryBuilder("user")
                .where(" user.username = :username",{username: username})
                .orWhere(" user.email = :email",{email: email})
                .getOne();
    console.log(user);
    return user;
  }
}
