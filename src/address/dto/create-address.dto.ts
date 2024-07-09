import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: '123 Main St',
  })
    @IsNotEmpty()
    @IsString()
    street: string;
  
    @ApiProperty({
      example: 'Springfield',
    })
    @IsNotEmpty()
    @IsString()
    city: string;
    
    @ApiProperty({
      example: 'IL',
    })
    @IsNotEmpty()
    @IsString()
    state: string;
  
    @ApiProperty({
      example: '62704',
    })
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @ApiProperty({
      example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
  }

    // example data create address
  // {
  //   "userId": 1,
  //   "street": "123 Main St",
  //   "city": "Springfield",
  //   "state": "IL",
  //   "zipCode": "62704"}