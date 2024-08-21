import { IsOptional, IsString, IsBoolean, IsEnum, IsArray, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidTag } from '../validators/post.validators';
import { MediaType } from '@prisma/client'; // Import MediaType from Prisma
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

  @ApiProperty({ description: 'URL of the media', required: false })
  @IsString({each:true})
  @IsOptional()
  @IsArray()
  url?: string[] | null;

  @ApiProperty({ description: 'Type of media', enum: ['image', 'video', 'both'], required: false })
  @IsEnum(MediaType)
  @IsOptional()
  mediaType?: MediaType;

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
}
