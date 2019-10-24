import { Injectable, CanActivate, ExecutionContext, MethodNotAllowedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // get request data
    const request = context.switchToHttp().getRequest();
    let roles = null;

    // get role from request data
    if (request.hasOwnProperty('user') && request.user.hasOwnProperty('ROLE'))
      roles = request.user.ROLE;

    // get the role name from controller
    const roleFilter = this.reflector.get<string[]>('roles', context.getHandler());

    // check if role is specify
    if (roles != null) {
      if (roleFilter.includes(roles)) {
        // allow process api
        return true;
      } else {
        // return forbidden
        return false;
      }
    } else {
      throw new MethodNotAllowedException('Please login or specify the role first', 'No role specified');
    }
  }

}