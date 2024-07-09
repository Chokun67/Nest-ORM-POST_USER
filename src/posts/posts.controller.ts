import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './models/post.model';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/jwt-auth.guard';
import { Express } from 'express'; // เพิ่มการ import นี้


import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':userId')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Param('userId') userId: number,
    @Body() createPostDto: any,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<BlogPost> {
    const { categoryIds, ...postDto } = createPostDto;
    
    return this.postsService.create(postDto, userId, categoryIds, image ? image.filename : null);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<BlogPost[]> {
    return this.postsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':postId')
  async delete(@Param('postId') postId: number): Promise<void> {
    return this.postsService.delete(postId);
  }

  
}