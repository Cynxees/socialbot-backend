import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsArray, IsDate, IsInt, Validate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidTag, FileExistsValidator } from "../validators/post.validators"
import { Transform } from 'class-transformer';

export class CreatePostRequestDto{
  
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the post', required: false })
  @IsString()
  @IsOptional()
  description?: string;


  @ApiProperty({ description: 'Location of the post', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Music associated with the post', required: false })
  @IsString()
  @IsOptional()
  music?: string;

  @ApiProperty({ description: 'Publication status', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @Transform(({ value}) => new Date(value))
  @ApiProperty({ description: 'Date of the post' })
  @IsDate()
  @IsNotEmpty()
  scheduledDate: Date;


  @ApiProperty({ description: 'Tags for the post', required: false })
  @IsArray()
  @IsValidTag({each: true})
  @IsString({each: true})
  @IsOptional()
  tags?: string[] | null;

  @ApiProperty({ description: 'Hashtags for the post', required: false })
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  hashtags?: string[] | null;

  @ApiProperty({ description: 'Author ID of the post', required: false })
  @IsOptional()
  @IsNumber()
  authorId: number;


  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Validate(FileExistsValidator, { each: true })
  fileIds?: number[] | null;

  @IsNumber()
  postgroupId: number;

}
