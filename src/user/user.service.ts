import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserRepository } from './repositories/user.repository';
import { PaginateUserRequestDto } from './dto/paginate-user-request.dto';
import { User } from '@prisma/client';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: CustomLoggerService
  ) {}
  async create(data: CreateUserRequestDto) : Promise<UserResponseDto> {
    this.logger.start()
    const user = await this.userRepository.createUser({data});
    
    this.logger.done();
    return user;
  }

  async paginate(params: PaginateUserRequestDto): Promise<UserResponseDto[]> {
    this.logger.start()

    const res = await this.userRepository.paginateUser(params);
    
    this.logger.done();
    return res;
  }

  async findOne(field: keyof User, value: any){
    this.logger.start()
    const user = this.userRepository.findOne(field, value);
    this.logger.done();
    return user;
  }

  async findByIdOrThrow(id: number): Promise<User>{
    this.logger.start()

    const user = await this.findOne('id', id);
    if(!user) throw new NotFoundException('User not found');

    this.logger.done();
    return user;
  }

  async deleteById(id: number): Promise<void> {
    this.logger.start()

    this.logger.log('finding user');
    await this.findByIdOrThrow(id);

    this.logger.log('deleting user');
    await this.userRepository.deleteById(id);
    this.logger.done();
  }

  async update(id: number, req: UpdateUserRequestDto ): Promise<UserResponseDto> {
    this.logger.start()
    
    this.logger.log('finding user');
    await this.findByIdOrThrow(id);

    this.logger.log('updating user');
    const user = await this.userRepository.update(id, req);

    this.logger.done();
    return user;
  }
}
