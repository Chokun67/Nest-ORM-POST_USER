import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    street: string;
  
    @IsNotEmpty()
    @IsString()
    city: string;
    
    @IsNotEmpty()
    @IsString()
    state: string;
  
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
  }