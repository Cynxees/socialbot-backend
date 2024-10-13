import { IsArray, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { Token } from "src/common/enums/token.enums";

export class  UpdateGoogleUserRequest {

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsEnum(Token)
  @IsOptional()
  tokenType?: Token;
  
  @IsDate()
  @IsOptional()
  expiresIn?: Date;

  @IsArray()
  @IsString({each: true})
  @IsOptional()  
  scopes?: string[];
}