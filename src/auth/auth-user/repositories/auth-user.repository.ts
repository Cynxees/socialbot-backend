import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository extends Repository<User> {
  constructor(private readonly ds: DataSource) {
    super(User, ds.createEntityManager());
  }
}
