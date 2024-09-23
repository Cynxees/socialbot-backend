import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginatePostRequestDto } from './dto/paginate-post-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostRequestDto } from './dto/update-post-request.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Permission } from 'src/common/enums/auth.enums';
import { captureRejectionSymbol } from 'events';
import { File } from '@prisma/client';
@ApiTags('Post')
@Controller('posts')
@ApiBearerAuth()
export class PostController {
  constructor(
    private readonly postsService: PostService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Post()
  // @Auth(Permissions.POST_CREATE) // Uncomment and adjust if authorization is required
  async create(@Body() req: CreatePostRequestDto): Promise<PostResponseDto> {
    this.logger.start();
    const res = await this.postsService.create(req);
    this.logger.done();
    return res;
  }

  @Get()
  // @Auth(Permissions.POST_READ) 
  async paginate(@Query() params: PaginatePostRequestDto): Promise<PostResponseDto[]> {
    this.logger.start();
    const res = await this.postsService.paginate(params); // Adjust if you have pagination logic
    this.logger.done();
    return res;
  }

  @Get(':id')
//   @Auth(Permissions.POST_READ) 
  async findById(@Param('id') id: number): Promise<PostResponseDto> {
    this.logger.start();
    const res = await this.postsService.findOne('id', id)
    this.logger.done();
    return res;
  }

  @Delete(':id')
  // @Auth(Permissions.POST_DELETE) 
  async delete(@Param('id') id: number) {
    this.logger.start();
    await this.postsService.deleteById(id);
    this.logger.done();
  }

  @Put(':id')
  // @Auth(Permissions.POST_UPDATE) 
  async update(@Param('id') id: number, @Body() req: UpdatePostRequestDto): Promise<PostResponseDto> {
    this.logger.start();
    const res = await this.postsService.update(id, req);
    this.logger.done();
    return res;
  }

  }

