import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'P@ssword',
    description: 'The password of the user'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'michel',
    description: 'The firstname of the user'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'scorefield',
    description: 'The lastname of the user'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
