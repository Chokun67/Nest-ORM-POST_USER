import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'testuser' }) // กำหนดตัวอย่างข้อมูลสำหรับ Swagger
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' }) 
  @IsString()
  @IsNotEmpty()
  password: string;
}
