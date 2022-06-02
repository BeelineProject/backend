/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserByUserNameOrEmail(id,id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log("inside update back "+updateUserDto);
    return this.userService.update(+id, updateUserDto);
  }
  @Get('inc:id')
  async inc(@Param('id') id: string) {
   const  user=this.userService.findOne(+id);
   console.log("hellooo"+user);
 
    console.log(user);
    const {username,email,password}=await(user);
    const points=(await user).points+1;
    return this.userService.update(+id, {username,email,password,points});
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
