import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { MediaTypeEnum } from "src/common/enums/media-type.enums";

export class CreateFileRequestDto {

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(MediaTypeEnum)
  mediaType: MediaTypeEnum;
}