import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user.dataValues);
    
    const payload = { username: user.dataValues.username, sub: user.dataValues.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: any): Promise<User> {
    const hashedPassword = bcrypt.hashSync(userDto.password, 10);
    return this.usersService.create({ ...userDto, password: hashedPassword });
  }
}
