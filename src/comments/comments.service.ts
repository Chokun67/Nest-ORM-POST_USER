import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/users/models/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    return this.commentModel.create({ ...createCommentDto, userId, createdAt: new Date(), updatedAt: new Date() });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<number> {
    const [affectedCount] = await this.commentModel.update({ ...updateCommentDto, updatedAt: new Date() }, { where: { id } });
    return affectedCount;
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentModel.findOne({ where: { id } });
    await comment.destroy();
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    return this.commentModel.findAll({ where: { postId }, include: [User] });
  }
}
