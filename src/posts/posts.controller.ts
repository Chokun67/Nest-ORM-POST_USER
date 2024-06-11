import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() createPostDto: any,): Promise<BlogPost> {
    const { categoryIds, ...postDto } = createPostDto;
    return this.postsService.create(postDto, userId, categoryIds);
  }

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.postsService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<BlogPost[]> {
    return this.postsService.findByUserId(userId);
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: number): Promise<void> {
    return this.postsService.delete(postId);
  }
}