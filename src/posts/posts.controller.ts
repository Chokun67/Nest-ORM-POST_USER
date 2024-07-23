import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, UploadedFile ,Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './models/post.model';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/jwt-auth.guard';
import { Express } from 'express'; // เพิ่มการ import นี้


import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @Body() createPostDto: any,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<BlogPost> {
    const { categoryIds, ...postDto } = createPostDto;
    console.log(req.user.userId);
    return this.postsService.create(postDto, req.user.userId, categoryIds, image ? image.filename : null);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/token')
  async findByUserToken(@Request() req): Promise<BlogPost[]> {
    return this.postsService.findByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<BlogPost[]> {
    return this.postsService.findByUserId(userId);
  }

  @Get('category/:id')
  async findByCategory(@Param('id') id: number) {
    return this.postsService.findByCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':postId')
  async delete(@Param('postId') postId: number): Promise<void> {
    return this.postsService.delete(postId);
  }

  
}