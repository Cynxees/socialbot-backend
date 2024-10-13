import { Token } from "src/common/enums/token.enums";
import { GoogleUser } from "../entities/google-user.entity";

export class GoogleUserResponse implements Partial<GoogleUser> {

  id: number;
  accessToken: string;
  tokenType: Token;
  
  expiresIn: Date;
  scopes: string[];
}