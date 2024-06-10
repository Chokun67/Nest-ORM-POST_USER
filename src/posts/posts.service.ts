import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post
  ) {}

  async create(postDto: any, userId: number): Promise<Post> {
    return this.postModel.create({ ...postDto, userId });
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postModel.findAll({ where: { userId } });
  }

  async delete(postId: number): Promise<void> {
    await this.postModel.destroy({ where: { id: postId } });
  }
  
}
