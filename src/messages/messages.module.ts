import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}

