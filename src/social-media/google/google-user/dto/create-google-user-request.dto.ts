import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Token } from "src/common/enums/token.enums";

export class CreateGoogleUserRequest {

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsEnum(Token)
  @IsNotEmpty()
  tokenType: Token;
  
  @IsDate()
  @IsNotEmpty()
  expiresIn: Date;

  @IsArray()
  @IsString({each: true})
  @IsOptional()  
  scopes?: string[];
}