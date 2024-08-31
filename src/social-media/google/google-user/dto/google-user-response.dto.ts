import {GoogleUser, BearerToken} from '@prisma/client'

export class GoogleUserResponse implements Partial<GoogleUser> {

  id: number;
  accessToken: string;
  tokenType: BearerToken;
  
  expiresIn: Date;
  scopes: string[];
}