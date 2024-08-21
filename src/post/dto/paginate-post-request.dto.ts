import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsInt, Min, IsString, } from "class-validator";
import { PaginateRequestDto } from "src/common/dto/paginate-request.dto"
import { PostFilterEnum, PostSortEnum } from 'src/common/enums/post.enums'

export class PaginatePostRequestDto extends PaginateRequestDto{
  
  @IsEnum(PostSortEnum)
  @IsOptional()
  orderBy: PostSortEnum = PostSortEnum.ID;
  
  @IsEnum(PostFilterEnum)
  @IsOptional()
  filterBy?: PostFilterEnum;


  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  scheduledDate?: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @Transform(({ value}) => parseInt(value,10))
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1; // Default page number

  @Transform(({ value}) => parseInt(value,10))
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10; // Default limit per page
}