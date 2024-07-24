import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
Comment

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentService, CommentsGateway],
})
export class CommentsModule {}
