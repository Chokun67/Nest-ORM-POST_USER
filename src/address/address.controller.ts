import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/jwt-auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }
  // example data create address
  // {
  //   "userId": 1,
  //   "street": "123 Main St",
  //   "city": "Springfield",
  //   "state": "IL",
  //   "zipCode": "62704"}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: any): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }
}
