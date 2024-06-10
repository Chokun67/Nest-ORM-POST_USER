import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Address } from 'src/address/models/address.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
