import { User } from "@prisma/client";
export class UserResponseDto implements Partial<User>{

  createdAt: Date;
  displayName: string;
  id: number;
  role: string;
  updatedAt: Date;
  username: string;

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }

  constructor(user: User) {
    Object.assign(this, UserResponseDto.removePassword(user));
  }

}