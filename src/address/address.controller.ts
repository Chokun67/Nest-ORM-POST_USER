import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: any): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }
}
