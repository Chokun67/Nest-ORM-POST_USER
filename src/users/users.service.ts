import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize'
import { User } from './models/user.model';
import { Address } from 'src/address/models/address.model';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Address)
    private addressModel: typeof Address
  ) {}

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   return this.userModel.create({
  //     firstName: createUserDto.firstName,
  //     lastName: createUserDto.lastName,
  //   });
  // }

  async create(createUserDto: any): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    if (createUserDto.address) {
      const address = await this.addressModel.create({ ...createUserDto.address, userId: user.id });
      user.address = address;
    }
    return user;
  }

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

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}