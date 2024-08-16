import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateFileRequestDto {

  @ApiProperty({ type: 'file' })
  @IsNotEmpty()
  file: Express.Multer.File
}