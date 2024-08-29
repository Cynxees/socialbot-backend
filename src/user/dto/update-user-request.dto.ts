import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsValidUsername } from '../validators/username.validator'
import { ValidatorEnum } from "src/common/enums/common.enums";
import { Role } from "@prisma/client";

export class UpdateUserRequestDto {

  @IsString()
  @IsOptional()
  @IsValidUsername(ValidatorEnum.UNIQUE)
  username?: string;
  
  @IsString()
  @IsOptional()
  password?: string;
  
  @IsString()
  @IsOptional()
  role?: Role;
  
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsNumber()
  @IsOptional()
  googleUserId?: number;
}
