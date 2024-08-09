import { IsOptional, IsString } from "class-validator";
import { IsValidUsername } from '../validators/username.validator'
import { ValidatorEnum } from "src/infrastructure/config/enums/common.enums";

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
  role?: string;
  
  @IsString()
  @IsOptional()
  displayName?: string;

}
