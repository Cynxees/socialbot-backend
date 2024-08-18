import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; 
import { PermissionsGuard } from '../guards/permissions.guard'; 
import { Action, AppSubjects } from 'src/config/permissions.schema';

export const ACTIONS_KEY = 'actions';
export const Auth = (...actions: { action: Action; subject: AppSubjects, field?: string }[]) => {
  return applyDecorators(
    SetMetadata(ACTIONS_KEY, actions),
    UseGuards(JwtAuthGuard, PermissionsGuard),
  );
};
