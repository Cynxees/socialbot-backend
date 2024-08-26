import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { MediaType } from "@prisma/client";
import { MediaTypeEnum } from "src/common/enums/media-type.enums";

export class CreateFileRequestDto {

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(MediaType)
  mediaType: MediaTypeEnum;
}