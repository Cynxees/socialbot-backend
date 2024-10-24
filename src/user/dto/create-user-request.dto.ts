import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/common/enums/auth.enums';
import { ValidatorEnum } from 'src/common/enums/common.enums';
import { IsValidUsername } from '../validators/username.validator';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsValidUsername(ValidatorEnum.UNIQUE)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * @example user
   */
  @IsString()
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsOptional()
  displayName?: string;
}
