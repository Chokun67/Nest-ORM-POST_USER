import { Controller, Get, Post, Body } from '@nestjs/common';
import { Address } from './models/address.model';
import { InjectModel } from '@nestjs/sequelize';


@Controller('addresses')
export class AddressService {
    constructor(
        @InjectModel(Address)
        private readonly addressModel: typeof Address,
      ) {}

  @Post()
  async create(@Body() createAddressDto: any): Promise<Address> {
    return this.addressModel.create(createAddressDto);
  }

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }
}

