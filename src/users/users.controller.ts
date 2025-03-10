import { Controller, Get, Post, Body, Param, Delete, UseGuards, NotFoundException, Put, UseInterceptors, UploadedFile ,Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { JwtAuthGuard, RolesGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('users')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'User ID' })  // เพิ่มการกำหนดพารามิเตอร์ให้ Swagger
  async findOne(@Param('id') id: string): Promise<User> {
    console.log(id, "test");

    const user = await this.usersService.findOne(id);
    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':userId')
  async updateUser(@Param('userId') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/image')
  @UseInterceptors(FileInterceptor('image'))
  async updateUserImage(@Param('userId') id: string, @UploadedFile() image?: Express.Multer.File) {
    if (!image) {
      throw new NotFoundException('No image file uploaded');
    }
    return this.usersService.updateImage(id, image.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}