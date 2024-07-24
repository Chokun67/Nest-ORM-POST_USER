import { Injectable, ExecutionContext, CanActivate, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToWs();
    const client = ctx.getClient();
    const authToken = client.handshake?.query?.token || client.handshake?.headers?.authorization?.split(' ')[1];

    if (!authToken) {
      throw new WsException('Unauthorized');
    }

    return {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new WsException(err || 'Unauthorized');
    }
    return user;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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