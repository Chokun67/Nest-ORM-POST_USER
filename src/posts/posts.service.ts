import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Category } from 'src/categories/models/category.model';
import { User } from 'src/users/models/user.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(postDto: any, userId: number, categoryIds: string, imageFilename: string | null): Promise<Post> {
    const post = await this.postModel.create({ ...postDto, userId, image: imageFilename });
    const categoryIdsArray = JSON.parse(categoryIds); 
    console.log(categoryIdsArray,"check");
    
    const categories = await this.categoryModel.findAll({ where: { id: categoryIdsArray } });
    await post.$set('categories', categories);
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll({ include: [Category,User ],order: [['createdAt', 'DESC']],  });
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return this.postModel.findAll({ where: { userId } , include: [Category,User ],order: [['createdAt', 'DESC']]});
  }

  async findByCategory(categoryId: number): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        {
          model: Category,
          where: { id: categoryId },
          through: { attributes: [] } // This removes extra fields from the join table
        },
        User
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async delete(postId: number): Promise<void> {
    await this.postModel.destroy({ where: { id: postId } });
  }
}
