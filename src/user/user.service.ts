import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { PaginateUserRequestDto } from './dto/paginate-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(
    data: CreateUserRequestDto,
    currentUser?: JwtUser,
  ): Promise<UserResponseDto> {
    this.logger.start();

    const user = await this.userRepository.save(data);

    this.logger.done();
    return user;
  }

  async paginate(
    params: PaginateUserRequestDto,
    user?: JwtUser,
  ): Promise<UserResponseDto[]> {
    this.logger.start();

    //TODO: Implement pagination
    const res = await this.userRepository.find();

    this.logger.done();
    return res;
  }

  async findOne(
    field: keyof User,
    value: any,
    currentUser?: JwtUser,
  ): Promise<User | null> {
    this.logger.start();
    const user = this.userRepository.findOne({
      where: {
        [field]: value,
      },
    });
    this.logger.done();
    return user;
  }

  async findByIdOrThrow(id: number, currentUser?: JwtUser): Promise<User> {
    this.logger.start();

    const user = await this.findOne('id', id, currentUser);
    if (!user) throw new NotFoundException('User not found');

    this.logger.done();
    return user;
  }

  async deleteById(id: number, currentUser?: JwtUser): Promise<void> {
    this.logger.start();

    this.logger.log('finding user');
    await this.findByIdOrThrow(id);

    this.logger.log('deleting user');
    await this.userRepository.delete({
      id,
    });
    this.logger.done();
  }

  async update(
    id: number,
    req: UpdateUserRequestDto,
    currentUser?: JwtUser,
  ): Promise<UserResponseDto> {
    this.logger.start();

    this.logger.log('finding user');
    await this.findByIdOrThrow(id);

    this.logger.log('updating user');
    await this.userRepository.update(id, req);
    const user = await this.findByIdOrThrow(id);

    this.logger.done();
    return user;
  }
}
