import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserRequestDto {

  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  role: string;
  
  @IsString()
  @IsOptional()
  display_name?: string;

}
