import { MediaType } from "src/common/enums/media-type.enums";

export class FileResponseDto {

  id: number;
  key: string;
  mediaType: MediaType;
}