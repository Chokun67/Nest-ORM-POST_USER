import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Address } from 'src/address/models/address.model';
import { Post } from 'src/posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Address, Post])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
