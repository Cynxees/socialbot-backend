import { IsNotEmpty, IsString } from "class-validator";

export class CreateFileRequestDto {

  @IsString()
  @IsNotEmpty()
  url: string;

}