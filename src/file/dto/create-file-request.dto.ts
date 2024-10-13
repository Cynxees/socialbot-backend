import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MediaType } from 'src/common/enums/media-type.enums';

export class CreateFileRequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(MediaType)
  mediaType: MediaType;
}
