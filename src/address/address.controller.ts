import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/address.model';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }
}
