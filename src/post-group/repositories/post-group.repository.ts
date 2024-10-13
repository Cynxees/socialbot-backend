import { Injectable } from '@nestjs/common';
import { PostGroup } from '../entities/post-group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostGroupRepository extends Repository<PostGroup> {
  
  constructor(private readonly ds: DataSource) {
    super(PostGroup, ds.createEntityManager());
  }
}

