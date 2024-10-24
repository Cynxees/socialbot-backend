import { Role } from "src/common/enums/auth.enums";
import { User } from "../entities/user.entity";
import { GoogleUser } from "src/social-media/google/google-user/entities/google-user.entity";

export class UserResponseDto implements Partial<User>{

  createdAt: Date;
  displayName?: string;
  id: number;
  role: Role;
  updatedAt: Date;
  username: string;
  googleUser?: GoogleUser;

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }

  constructor(user: User) {
    Object.assign(this, UserResponseDto.removePassword(user));
  }

}