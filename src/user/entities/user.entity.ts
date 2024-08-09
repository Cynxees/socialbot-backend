import { User } from '@prisma/client';

export class UserEntity implements User {

  id: number;
  display_name: string| null;
  password: string;
  role: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

}
