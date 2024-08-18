import { AbilityBuilder } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { accessibleBy, createPrismaAbility } from '@casl/prisma';
import { Ability, Action, AppSubjects, Role, SubjectWhereInput } from "src/config/permissions.schema";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";

@Injectable()
export class CaslAbilityFactory {

  constructor(private readonly logger: CustomLoggerService){}

  createForUser(user: JwtUser) : Ability {
    if(!user) return null;

    this.logger.start();
    this.logger.log(`creating ability for user ${user.id}: ${user.username} - ${user.role}`)
    
    const { can, cannot, build } = new AbilityBuilder<Ability>(createPrismaAbility)
    this.logger.log('ability created');

    if(user.role == Role.SUPER_ADMIN){
      can(Action.Manage, "all")
    }

    if(user.role == Role.ADMIN){
      can(Action.Manage, "User")
    }

    if(user.role == Role.USER){

      can(Action.Manage, 'Post', {authorId: user.id});
      can(Action.Manage, 'User',{id: user.id});
      cannot(Action.Read, 'User', 'password')

    }

    this.logger.done();
    return build();
  }

  getPrismaWhereOption<T extends AppSubjects>(user: JwtUser, subject: T): SubjectWhereInput<T> | {}{
    if(!user) return {};

    const ability = this.createForUser(user);
    return accessibleBy(ability)[subject as keyof AppSubjects] as SubjectWhereInput<T>
    
  }
}