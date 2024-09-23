import { Controller, Post, Body, Param, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PostGroupService } from  './post-group.service'
import { PostGroupDto } from './post-group.dto';
import { CreatePostGroupDto } from './create-post-group.dto';
import { UpdatePostGroupDto } from './update-post-group.dto';

@Controller('post-groups')
export class PostGroupController {
  constructor(private readonly postGroupService: PostGroupService) {}

  @Post()
  async createPostGroup(@Body() createPostGroupDto: CreatePostGroupDto): Promise<PostGroupDto> {
    return this.postGroupService.create(createPostGroupDto);
  }

  @Get(':id')
  async getPostGroupById(@Param('id', ParseIntPipe) id: number): Promise<PostGroupDto> {
    return this.postGroupService.findById(id);
  }

  @Put(':id')
  async updatePostGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostGroupDto: UpdatePostGroupDto
  ): Promise<PostGroupDto> {
    return this.postGroupService.update(id, updatePostGroupDto);
  }

  @Delete(':id')
  async deletePostGroup(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postGroupService.delete(id);
  }
}
