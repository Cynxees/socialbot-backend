import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '@prisma/client'; // Import MediaType from Prisma

export class CreatePostRequestDto {
  
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Caption of the post', required: false })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({ description: 'URL of the media' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'Type of media', enum: ['image', 'video', 'both'] })
  @IsEnum(MediaType)
  media_type: MediaType;

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

  @ApiProperty({ description: 'Date of the post' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Tags for the post', required: false })
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiProperty({ description: 'Hashtags for the post', required: false })
  @IsString()
  @IsOptional()
  hastags?: string;

  @ApiProperty({ description: 'Author ID of the post', required: false })
  @IsOptional()
  authorId?: number;
}
