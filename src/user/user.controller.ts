import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateUserRequestDto } from './dto/paginate-user-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PasswordHasherPipe } from './pipes/password-hasher.pipe';
import { Action } from 'src/config/permissions.schema';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Post()
  @Auth({action: Action.Create, subject: 'User'})
  async create(@Body(PasswordHasherPipe) req: CreateUserRequestDto, @CurrentUser() user: JwtUser) {
    this.logger.start()
    const res = await this.userService.create(req, user);
    this.logger.done();
    return res;
  }
  @Get()
  @Auth({action: Action.Read, subject: 'User'})
  async paginate(@Query() params: PaginateUserRequestDto, @CurrentUser() user: JwtUser) {
    this.logger.start()
    const res = await this.userService.paginate(params, user);
    this.logger.done();
    return res;
  }

  @Get(':id')       
  @Auth({action: Action.Read, subject: 'User'})
  async findById(@Param('id') id: number, @CurrentUser() user: JwtUser) {
    this.logger.start()
    const res = await this.userService.findByIdOrThrow(+id, user);
    this.logger.done();
    return res;
  }

  @Delete(':id')
  @Auth({action: Action.Delete, subject: 'User'})
  async delete(@Param('id') id: number, @CurrentUser() user: JwtUser) {
    this.logger.start()
    const res = await this.userService.deleteById(+id, user);
    this.logger.done();
    return res;
  }

  @Put(':id')
  @Auth({action: Action.Update, subject: 'User'})
  async update(@Param('id') id: number, @Body(PasswordHasherPipe) req : UpdateUserRequestDto, @CurrentUser() user: JwtUser) : Promise<UserResponseDto> {
    this.logger.start()
    const res = await this.userService.update(+id, req, user);
    this.logger.done();
    return res;
  }
}
