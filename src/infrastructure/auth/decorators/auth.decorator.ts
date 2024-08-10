import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Permissions } from 'src/common/enums/auth.enums';
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; 
import { PermissionsGuard } from '../guards/permissions.guard'; 

export const PERMISSIONS_KEY = 'permissions';
export const Auth = (...permissions: Permissions[]) => {
  return applyDecorators(
    SetMetadata(PERMISSIONS_KEY, permissions),
    UseGuards(JwtAuthGuard, PermissionsGuard),
  );
};
