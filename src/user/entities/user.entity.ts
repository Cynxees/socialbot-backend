import { $Enums, User } from "@prisma/client";
import { GoogleUserEntity } from '../../social-media/google/google-user/entities/google-user.entity';

export class UserEntity implements User  {
  id: number;
  displayName: string;
  username: string;
  password: string;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
  
  googleUserId: number;
  googleUser: GoogleUserEntity;
}