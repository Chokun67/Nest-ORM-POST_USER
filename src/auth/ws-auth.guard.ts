// src/auth/ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.auth?.token;

    if (!token) {
      throw new WsException('Missing token');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'your_jwt_secret', // ต้องตรงกับ JwtStrategy
      });

      client.user = payload; // แนบ user ไว้ที่ socket
      return true;
    } catch (error) {
      throw new WsException('Invalid or expired token');
    }
  }
}
