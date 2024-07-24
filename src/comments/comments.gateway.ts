import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@WebSocketGateway({ cors: true })
export class CommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly commentService: CommentService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() data: { createCommentDto: CreateCommentDto; userId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(`Received addComment event with data: ${JSON.stringify(data)}`);

    try {
      const comment = await this.commentService.create(
        data.createCommentDto,
        data.userId,
      );
      this.server.emit('commentAdded', comment);
    } catch (error) {
      console.error(`Error creating comment: ${error.message}`);
      client.emit('error', {
        message: 'Error creating comment',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('updateComment')
  async handleUpdateComment(
    @MessageBody() data: { id: number; updateCommentDto: UpdateCommentDto },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const affectedCount = await this.commentService.update(
      data.id,
      data.updateCommentDto,
    );
    console.log(affectedCount);
    if (affectedCount > 0) {
      const updatedComments = await this.commentService.findByPostId(
        data.updateCommentDto.postId,
      );
      this.server.emit('commentUpdated', updatedComments);
    }
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('deleteComment')
  async handleDeleteComment(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.commentService.delete(data.id);
    this.server.emit('commentDeleted', { id: data.id });
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getComments')
  async handleGetComments(
    @MessageBody() data: { postId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const comments = await this.commentService.findByPostId(data.postId);
    client.emit('comments', comments);
  }
}
