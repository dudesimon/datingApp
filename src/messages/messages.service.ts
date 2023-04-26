import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Message } from './entities/message.entity';
import { Loaded, NotFoundError } from '@mikro-orm/core';

@Injectable()
export class MessagesService {
  constructor(
    private readonly em: EntityManager
    ) {}
    async create(createProfileDto: CreateMessageDto): Promise<Message> {
      const message: Message = new Message(/**createMessageDto */);
      await this.em.persistAndFlush(message);
      
      return message;
    }

  findAll() {
    return this.em.find(Message, {});
  }

  async findOne(id: number) {
    const message: Loaded<Message> | null = await this.em.findOne(Message, { id });
    if(!message){
      throw new NotFoundError('User not found');
    }
    return message
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message: Loaded<Message> = await this.findOne(id);
    message.message = UpdateMessageDto.name ?? message.message;
    await this.em.persistAndFlush(message);
    return message;
  }

  async remove(id: number) {
    const message: Loaded<Message> = await this.findOne(id);
    this.em.removeAndFlush(message);
    return message;
  }
}
