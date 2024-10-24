import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {

  /**
   * @example 'admin'
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * @example 'pass'
   */
  @IsNotEmpty()
  @IsString()
  password: string;

}