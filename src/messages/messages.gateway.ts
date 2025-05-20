// src/messages/messages.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/ws-auth.guard';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
export class MessagesGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { senderId: number; receiverId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.createMessage(data);
    const room = this.getRoomName(data.senderId, data.receiverId);
    this.server.to(room).emit('newMessage', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { senderId: number; receiverId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.getRoomName(data.senderId, data.receiverId);
    client.join(room);
  }

  private getRoomName(user1: number, user2: number): string {
    return [user1, user2].sort((a, b) => a - b).join('_');
  }
}

