import { Controller, Post, Body, Param, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PostGroupService } from  './post-group.service'
import { PostGroupResponseDto } from './dto/post-group-response.dto';
import { CreatePostGroupRequestDto } from './dto/create-post-group-request.dto';
import { UpdatePostGroupRequestDto } from './dto/update-post-group-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post Groups')
@Controller('post-groups')
export class PostGroupController {
  constructor(private readonly postGroupService: PostGroupService) {}

  @Post()
  async createPostGroup(@Body() createPostGroupDto: CreatePostGroupRequestDto): Promise<PostGroupResponseDto> {
    return this.postGroupService.create(createPostGroupDto);
  }

  @Get(':id')
  async getPostGroupById(@Param('id', ParseIntPipe) id: number): Promise<PostGroupResponseDto> {
    return this.postGroupService.findById(id);
  }

  @Put(':id')
  async updatePostGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostGroupDto: UpdatePostGroupRequestDto
  ): Promise<PostGroupResponseDto> {
    return this.postGroupService.update(id, updatePostGroupDto);
  }

  @Delete(':id')
  async deletePostGroup(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postGroupService.delete(id);
  }
}
