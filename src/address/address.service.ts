import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { Address } from './models/address.model';
import { InjectModel } from '@nestjs/sequelize';

@Controller('addresses')
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  @Post()
  async create(addressDto: any): Promise<Address> {
    return this.addressModel.create(addressDto);
  }

  @Put()
  async update(id: number, addressDto: any): Promise<Address> {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new Error('Address not found');
    }
    return address.update(addressDto);
}
  

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  async findByUserId(userId: number): Promise<Address> {
    return this.addressModel.findOne({ where: { userId } });
  }
}
