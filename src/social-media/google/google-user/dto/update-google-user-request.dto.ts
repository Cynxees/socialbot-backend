import { BearerToken } from "@prisma/client";
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class  UpdateGoogleUserRequest {

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsEnum(BearerToken)
  @IsOptional()
  tokenType?: BearerToken;
  
  @IsDate()
  @IsOptional()
  expiresIn?: Date;

  @IsArray()
  @IsString({each: true})
  @IsOptional()  
  scopes?: string[];
}