import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '../enum/user-role.enum';

@Injectable()
export class RoleGuard extends AuthGuard('jwt-client') implements CanActivate {
  roles: UserRoleEnum[] = [];

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles) {
      this.roles = requiredRoles;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    if (this.roles) {
      if (!this.roles.includes(user.role))
        throw new ForbiddenException('inappropriate role');
    }

    return user;
  }
}
