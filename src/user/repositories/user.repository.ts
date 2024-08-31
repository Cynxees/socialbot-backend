import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/_infrastructure/prisma/prisma.service";
import { CreateUserRequestDto } from "../dto/create-user-request.dto";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { PaginateUserRequestDto } from "../dto/paginate-user-request.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { Prisma, User } from "@prisma/client";
import { UpdateUserRequestDto } from "../dto/update-user-request.dto";
import { CaslAbilityFactory } from "src/common/casl/casl-ability.factory/casl-ability.factory";
import { Action } from "src/config/permissions.schema";
import { subject } from "@casl/ability";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
    private readonly caslService: CaslAbilityFactory
  ) {}

  async createUser(params: { data: CreateUserRequestDto }, currentUser?: JwtUser) : Promise<UserResponseDto> {
    this.logger.start()
    const {data} = params;

    if(currentUser){
      const ability = this.caslService.createForUser(currentUser);
      if(!ability.can(Action.Create, 'User')) throw new ForbiddenException('Access Denied: Creating User');
    }
    
    const user = await this.prisma.user.create({data});
    
    this.logger.done()
    return user;
  }

  async paginateUser(params: PaginateUserRequestDto, currentUser?: JwtUser): Promise<UserResponseDto[]>{
    this.logger.start()
    const {filter, filterBy, order, orderBy, skip, take} = params;

    const caslWhereOption = this.caslService.getPrismaWhereOption(currentUser, "User");
    const filterWhereOption = filterBy && filter ? {[filterBy]: { contains: filter }} : {}
    
    let whereOption : Prisma.UserWhereInput = { 
      AND: [
        filterWhereOption,
        caslWhereOption
      ]
    }
    
    const orderByOption = { [orderBy]:  order } ;

    const res = await this.prisma.user.findMany({where: whereOption, orderBy: orderByOption, skip, take, select: {
      id: true,
      displayName: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      password: false,
      _count: true
    }});
    
    this.logger.done()
    return res;
  }
  

  async findOne(field: keyof User, value: any, currentUser?: JwtUser): Promise<UserEntity | null>{
    this.logger.start();

    const ability = this.caslService.createForUser(currentUser);
    const whereOption = this.caslService.getPrismaWhereOption(currentUser, "User");

    const user = await this.prisma.user.findFirst({
      where: {
        AND: [
          whereOption,
          {[field]: value}
        ]
      },
      select: {
        id: true,
        displayName: true,
        username: true,
        role: true,
        createdAt: true,
        posts: true,
        updatedAt: true,
        googleUserId: true,
        googleUser: true,
        password: ability ? !ability.cannot(Action.Read, 'User', 'password'): false
      }
    });  

    this.logger.done();
    return user;
  }

  async deleteById(id: number, currentUser?: JwtUser): Promise<void>{
    this.logger.start();

    this.logger.log('getting user to delete');
    const userToDelete = await this.findOne("id", id, currentUser);
    
    if(!userToDelete) throw new NotFoundException('User Not Found');
    
    if(currentUser){
      const ability = this.caslService.createForUser(currentUser);
      this.logger.log('checking permissions')
      if(!ability.can(Action.Delete, subject('User', userToDelete))) throw new ForbiddenException('Access Denied: Delete User')
    }
    
    this.logger.log('deleting user');
    await this.prisma.user.delete({
      where: {id}
    });
    
    this.logger.done();
  }

  async update(id: number, req: UpdateUserRequestDto, currentUser?: JwtUser): Promise<User>{
    this.logger.start();

    this.logger.log('getting user to update');
    const userToUpdate = await this.findOne("id", id, currentUser);
    
    if(!userToUpdate) throw new NotFoundException('User Not Found');

    if(currentUser){
      const ability = this.caslService.createForUser(currentUser);
      this.logger.log('checking permissions')
      if(!ability.can(Action.Update, subject('User', userToUpdate))) throw new ForbiddenException('Access Denied: Update User')
    }

    this.logger.log('updating user');
    const user = await this.prisma.user.update({
      where: { id: id },
      data: req
    })

    this.logger.done();
    return user;
  }
}