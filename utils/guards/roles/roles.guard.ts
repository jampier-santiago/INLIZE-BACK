// Packages
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Determines if the user is authorized to access a particular route based on their role.
   * @param context - The execution context of the route.
   * @returns A boolean indicating whether the user is authorized.
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('rols', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role.name);
  }
}
