import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserRequestDto) : Promise<User> {
    return await this.prisma.user.create({data: createUserDto});
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.user.findMany();
  }
}
