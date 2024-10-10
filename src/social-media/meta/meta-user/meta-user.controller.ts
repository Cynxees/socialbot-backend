import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { MetaUserService } from './meta-user.service';
import { CreateMetaUserRequestDto } from './dto/create-meta-user-request.dto';

@ApiTags('Meta')
@Controller('meta')
export class MetaUserController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly metaService: MetaUserService,
  ) {}

  @Post()
  async createMetaUser(@Body() req: CreateMetaUserRequestDto) {
    this.logger.start();

    const result = await this.metaService.createMetaUser();

    this.logger.done();
    return result;
  }
}
