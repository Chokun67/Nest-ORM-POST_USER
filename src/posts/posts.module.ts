import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './models/post.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/categories/models/category.model';
import { PostCategory } from 'src/categories/models/post-category.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, Category, PostCategory,User]),
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),limits: {
      fileSize: 1024 * 1024 * 5, // จำกัดขนาดไฟล์ 5MB
    }})],
  
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
