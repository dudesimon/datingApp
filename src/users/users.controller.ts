import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const setup = await this.usersService.create(createUserDto);
    return { 
      id: setup.id, 
      username: setup.username, 
      password: setup.password,
      email_address: setup.email_address,
      date_of_birth: setup.date_of_birth,
      telephone: setup.telephone,
      sender_messages: setup.sender_messages,
      receiver_messages: setup.receiver_messages,
      followers: setup.followers,
      following: setup.following,
      profile: setup.profile,
      apiKey: setup.apiKey
     }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
