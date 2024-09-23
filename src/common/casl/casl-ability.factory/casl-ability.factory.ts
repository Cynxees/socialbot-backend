import { AbilityBuilder } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { accessibleBy, createPrismaAbility } from '@casl/prisma';
import { Ability, Action, AppSubjects, SubjectWhereInput } from "src/config/permissions.schema";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { Role } from "@prisma/client";

@Injectable()
export class CaslAbilityFactory {

  constructor(private readonly logger: CustomLoggerService){}

  createForUser(user: JwtUser) : Ability {
    if(!user) return null;

    this.logger.start();
    this.logger.log(`creating ability for user ${user.id}: ${user.username} - ${user.role}`)
    
    const { can, cannot, build } = new AbilityBuilder<Ability>(createPrismaAbility)
    this.logger.log('ability created');

    if(user.role == Role.super_admin){
      can(Action.Manage, "all")
    }

    if(user.role == Role.admin){
      can(Action.Manage, "User")
    }

    if(user.role == Role.user){

      can(Action.Manage, 'PostGroup', {authorId: user.id});
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