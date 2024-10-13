import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostGroupRequestDto {
  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsDateString()
  @IsOptional()
  scheduledDate?: Date;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @IsOptional()
  postIds?: number[];

  @IsArray()
  @IsOptional()
  fileIds?: number[];

  @IsNumber()
  @IsOptional()
  musicId?: number;
}
