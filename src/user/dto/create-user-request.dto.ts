import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsValidUsername } from "../validators/username.validator";
import { ValidatorEnum } from "src/common/enums/common.enums";
import { Role } from "@prisma/client";

export class CreateUserRequestDto {

  @IsString()
  @IsNotEmpty()
  @IsValidUsername(ValidatorEnum.UNIQUE)
  username: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  role: Role;
  
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsNumber()
  @IsOptional()
  googleUserId?: number;
}
