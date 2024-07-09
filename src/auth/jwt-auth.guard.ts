import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  // handleRequest(err, user, info) {
  //   if (err || !user) {       
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;// form payload in token
    console.log("param request",request.params);
    
    const userId = request.params.userId;
    console.log(user.userId)
    console.log("param",userId)
    if (user.userId != userId) {
      throw new ForbiddenException('You are not allowed to update this user');
    }
    return true;
  }
}