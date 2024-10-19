import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { PostGroupFileRepository } from './post-group-file.repository';

@Injectable()
export class PostGroupFileService {
  constructor(
    private readonly postGroupFileRepository: PostGroupFileRepository,
    private readonly logger: CustomLoggerService,
  ) {}
}
