import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './models/category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCategory } from './models/post-category.model';

@Module({
  imports: [SequelizeModule.forFeature([Category,PostCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
