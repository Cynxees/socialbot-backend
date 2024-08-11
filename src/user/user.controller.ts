import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateUserRequestDto } from './dto/paginate-user-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { Auth } from 'src/_infrastructure/auth/decorators/auth.decorator';
import { Permissions } from 'src/common/enums/auth.enums';
import { PasswordHasherPipe } from './pipes/password-hasher.pipe';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Post()
  // @Auth(Permissions.USER_CREATE)
  async create(@Body(PasswordHasherPipe) req: CreateUserRequestDto) {
    this.logger.start()
    const res = await this.userService.create(req);
    this.logger.done();
    return res;
  }
  @Get()
  // @Auth(Permissions.USER_READ)
  async paginate(@Query() params: PaginateUserRequestDto) {
    this.logger.start()
    const res = await this.userService.paginate(params);
    this.logger.done();
    return res;
  }

  @Get(':id')       
  // @Auth(Permissions.USER_READ)
  async findById(@Param('id') id: number) {
    this.logger.start()
    const res = await this.userService.findByIdOrThrow(+id);
    this.logger.done();
    return res;
  }

  @Delete(':id')
  @Auth(Permissions.USER_DELETE)
  async delete(@Param('id') id: number) {
    this.logger.start()
    const res = await this.userService.deleteById(+id);
    this.logger.done();
    return res;
  }

  @Put(':id')
  @Auth(Permissions.USER_UPDATE)
  async update(@Param('id') id: number, @Body(PasswordHasherPipe) req : UpdateUserRequestDto) : Promise<UserResponseDto> {
    this.logger.start()
    const res = await this.userService.update(+id, req);
    this.logger.done();
    return res;
  }
}
