import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Category } from 'src/categories/models/category.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}

  async create(postDto: any, userId: number, categoryIds: number[]): Promise<Post> {
    // return this.postModel.create({ ...postDto, userId });
    const post = await this.postModel.create({ ...postDto, userId });
    const categories = await this.categoryModel.findAll({ where: { id: categoryIds } });
    await post.$set('categories', categories);
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll({ include: [Category] });
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postModel.findAll({ where: { userId } , include: [Category]});
  }

  async delete(postId: number): Promise<void> {
    await this.postModel.destroy({ where: { id: postId } });
  }
  
}
