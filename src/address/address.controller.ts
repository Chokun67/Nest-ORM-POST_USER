import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/address.model';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: any): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }
  // example data create address
  // {
  //   "userId": 1,
  //   "street": "123 Main St",
  //   "city": "Springfield",
  //   "state": "IL",
  //   "zipCode": "62704"}

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: any): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }
}
