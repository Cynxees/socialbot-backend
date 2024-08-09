import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginateUserRequestDto } from './dto/paginate-user-request.dto';
import { CustomLoggerService } from 'src/infrastructure/logger/logger.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLoggerService
  ) {}

  @Post()
  async create(@Body() req: CreateUserRequestDto) {
    this.logger.start()
    const res = await this.userService.create(req);
    this.logger.done();
    return res;
  }
  @Get()
  async paginate(@Query() params: PaginateUserRequestDto) {
    this.logger.start()
    const res = await this.userService.paginate(params);
    this.logger.done();
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.logger.start()
    const res = await this.userService.deleteById(+id);
    this.logger.done();
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() req : UpdateUserRequestDto) : Promise<UserResponseDto> {
    this.logger.start()
    const res = await this.userService.update(+id, req);
    this.logger.done();
    return res;
  }

}
