import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreatePostGroupRequestDto {
  @IsNumber()
  authorId: number;

  @IsDateString()
  scheduledDate: Date;

  @IsBoolean()
  isPublished: boolean;

  @IsArray()
  postIds?: number[];

  @IsArray()
  @IsOptional()
  fileIds?: number[];

}
