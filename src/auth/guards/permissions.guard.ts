import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTIONS_KEY } from '../decorators/auth.decorator';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CaslAbilityFactory } from 'src/common/casl/casl-ability.factory/casl-ability.factory';
import { Action, AppSubjects } from 'src/config/permissions.schema';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: CustomLoggerService,
    private readonly abilityFactory: CaslAbilityFactory
  
  ) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.start();
    const requiredActions = this.reflector.getAllAndOverride<{action: Action, subject: AppSubjects, field?: string}[]>(
      ACTIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredActions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtUser;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const ability = this.abilityFactory.createForUser(user);

    const hasPermission = requiredActions.every(({ action, subject, field }) => {
      return ability.can(action, subject, field);
    });

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    this.logger.done();
    return true;
  }
}
