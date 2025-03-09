import { Injectable, ExecutionContext, CanActivate, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'ws') {
      // WebSocket Request
      const ctx = context.switchToWs();
      const client = ctx.getClient();

      // ดึง Token จาก Header หรือ Query
      const token =
        client.handshake?.query?.token ||
        client.handshake?.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new WsException('Unauthorized');
      }

      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      // HTTP Request (REST API)
      const request = context.switchToHttp().getRequest();

      console.log('Request Headers:', request.headers); // 🔥 Debug Headers
      console.log('Authorization Header:', request.headers.authorization); // 🔥 Debug Authorization Header
      return context.switchToHttp().getRequest();
    }
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      if (context.getType() === 'ws') {
        throw new WsException('Unauthorized');
      }
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const wsContext = context.switchToWs().getClient();
    const user = request ? request.user : wsContext.user;

    if (!user) {
      throw new WsException('Unauthorized');
    }

    const userId = request ? request.params.userId : wsContext.handshake?.query?.userId;

    if (user.userId != userId) {
      throw new ForbiddenException('You are not allowed to update this user');
    }
    return true;
  }
}