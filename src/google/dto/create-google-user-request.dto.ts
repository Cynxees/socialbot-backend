import { BearerToken } from "@prisma/client";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class  CreateGoogleUserRequest {

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsEnum(BearerToken)
  @IsNotEmpty()
  tokenType: BearerToken;
  
  @IsDate()
  @IsNotEmpty()
  expiresIn: Date;

  @IsArray()
  @IsString({each: true})
  @IsOptional()  
  scopes?: string[];
}