import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostGroupFile } from './entity/post-group-file.entity';

@Injectable()
export class PostGroupFileRepository extends Repository<PostGroupFile> {
  constructor(private readonly ds: DataSource) {
    super(PostGroupFile, ds.createEntityManager());
  }
}
