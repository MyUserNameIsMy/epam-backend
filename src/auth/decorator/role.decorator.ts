import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enum/user-role.enum';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
