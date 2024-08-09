import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { CreateUserRequestDto } from "../dto/create-user-request.dto";
import { CustomLoggerService } from "src/infrastructure/logger/logger.service";
import { PaginateUserRequestDto } from "../dto/paginate-user-request.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { User } from "@prisma/client";
import { UpdateUserRequestDto } from "../dto/update-user-request.dto";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService
  ) {}

  async createUser(params: { data: CreateUserRequestDto }) : Promise<UserResponseDto> {
    this.logger.start()
    const {data} = params;
    const user = await this.prisma.user.create({data});
    
    this.logger.done()
    return user;
  }

  async paginateUser(params: PaginateUserRequestDto): Promise<UserResponseDto[]>{
    this.logger.start()
    const {filter, filterBy, order, orderBy, skip, take} = params;
  
    const whereOption = filterBy && filter ? { [filterBy]: { contains: filter } } : undefined;
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

  async findOne(field: keyof User, value: any): Promise<User | null>{
    this.logger.start();

    const user = await this.prisma.user.findFirst({
      where: { [field] : value }
    })

    this.logger.done();
    return user;
  }

  async deleteById(id: number): Promise<void>{
    this.logger.start();
    await this.prisma.user.delete({
      where: { id : id }
    })
    this.logger.done();
  }

  async update(id: number, req: UpdateUserRequestDto): Promise<User>{
    this.logger.start();

    const user = await this.prisma.user.update({
      where: { id: id },
      data: req
    })

    this.logger.done();
    return user;
  }
}