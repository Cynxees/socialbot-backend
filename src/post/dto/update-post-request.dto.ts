import { IsOptional, IsString, IsBoolean, IsArray, IsDate, IsInt, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidTag, FileExistsValidator } from '../validators/post.validators';
import { Transform } from 'class-transformer';
export class UpdatePostRequestDto {

  @ApiProperty({ description: 'Title of the post', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Caption of the post', required: false })
  @IsString()
  @IsOptional()
  caption?: string;


  @ApiProperty({ description: 'Location of the post', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Music associated with the post', required: false })
  @IsString()
  @IsOptional()
  music?: string;

  @ApiProperty({ description: 'Publication status', required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @Transform(({ value}) => new Date(value))
  @ApiProperty({ description: 'Date of the post', required: false })
  @IsDate()
  @IsOptional()
  scheduledDate?: Date;

  @ApiProperty({ description: 'Tags for the post', required: false })
  @IsString({each:true})
  @IsArray()
  @IsValidTag({each:true})
  @IsOptional()
  tags?: string[] | null;

  @ApiProperty({ description: 'Hashtags for the post', required: false })
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  hashtags?: string[] | null;

  @ApiProperty({ description: 'Author ID of the post', required: false })
  @IsOptional()
  authorId?: number;


  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Validate(FileExistsValidator, { each: true })
  fileIds?: number[] | null;
}
