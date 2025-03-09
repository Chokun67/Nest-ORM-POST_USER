import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize'
import { User } from './models/user.model';
import { Address } from 'src/address/models/address.model';


@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Address)
    private readonly addressModel: typeof Address
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      username: createUserDto.username,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName

    });
  }
 
  async findOneUser(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username  } });
  }

  // async create(userDto: any): Promise<User> {
  //   return this.userModel.create(userDto);
  // }

  // async create(createUserDto: any): Promise<User> {
  //   const user = await this.userModel.create(createUserDto);
  //   if (createUserDto.address) {
  //     const address = await this.addressModel.create({ ...createUserDto.address, userId: user.id });
  //     user.address = address;
  //   }
  //   return user;
  // }

  // async findAll(): Promise<User[]> {
  //   return this.userModel.findAll();
  // }
  // include address one-one
  
  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: [Address] });
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      include:[Address]  
    });
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(updateUserDto);
  }
  

  async updateImage(id: string, imageFilename: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.update({ image: imageFilename });
  }
  
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}