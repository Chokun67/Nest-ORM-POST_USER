// src/messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  async createMessage(data: { senderId: number; receiverId: number; content: string }) {
    return this.messageModel.create(data);
  }

  async getConversation(user1: number, user2: number) {
    return this.messageModel.findAll({
      where: {
        senderId: [user1, user2],
        receiverId: [user1, user2],
      },
      order: [['createdAt', 'ASC']],
    });
  }
}
