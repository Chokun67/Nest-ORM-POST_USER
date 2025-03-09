import { Controller,Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto);
  }
}