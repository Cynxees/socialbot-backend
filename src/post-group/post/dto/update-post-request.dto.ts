import { IsOptional, IsString, IsBoolean, IsArray, IsDate, IsInt, Validate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidTag, FileExistsValidator } from '../validators/post.validators';
import { Transform } from 'class-transformer';
export class UpdatePostRequestDto {

  @ApiProperty({ description: 'Title of the post', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Description of the post', required: false })
  @IsString()
  @IsOptional()
  description?: string;


  @ApiProperty({ description: 'Location of the post', required: false })
  @IsString()
  @IsOptional()
  location?: string;

 

  @ApiProperty({ description: 'Publication status', required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

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

  @IsNumber()
  postGroupId: number
}
