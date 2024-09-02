import { IsNotEmpty, IsNumber } from "class-validator";

export class UploadYoutubeRequestDto {

  @IsNotEmpty()
  @IsNumber()
  fileId: number;

}