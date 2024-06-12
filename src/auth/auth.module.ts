import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocalStrategy } from './strategies/local.strategies';
import { RolesGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // ควรเก็บ secret key ใน environment variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
