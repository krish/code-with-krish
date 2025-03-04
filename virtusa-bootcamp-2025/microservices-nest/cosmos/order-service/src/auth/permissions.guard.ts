import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (
      !user ||
      !user.permissions ||
      !user.permissions.includes(requiredPermission)
    ) {
      throw new ForbiddenException(
        `You do not have permission: ${requiredPermission}`,
      );
    }

    return true;
  }
}
