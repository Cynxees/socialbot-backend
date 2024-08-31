import { $Enums, File } from "@prisma/client";

export class FileEntity implements File {

  id: number;
  url: string;
  mediaType: $Enums.MediaType;

}