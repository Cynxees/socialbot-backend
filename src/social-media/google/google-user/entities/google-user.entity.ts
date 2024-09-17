import { GoogleUser } from '@prisma/client';

export class GoogleUserEntity implements GoogleUser {
  id: number;
  accessToken: string;
  refreshToken: string;
  scopes: string[];
  tokenType: 'bearer';
  expiresIn: Date;
}
