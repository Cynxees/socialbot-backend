import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsValidUsername } from "../validators/username.validator";
import { ValidatorEnum } from "src/common/enums/common.enums";

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
  role: string;
  
  @IsString()
  @IsOptional()
  displayName?: string;

}
