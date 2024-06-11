import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './models/post.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/categories/models/category.model';
import { PostCategory } from 'src/categories/models/post-category.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, Category, PostCategory])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
