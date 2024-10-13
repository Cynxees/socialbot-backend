import { IsEnum, IsOptional, IsString, IsInt, Min } from "class-validator";
import { PaginateRequestDto } from "src/common/dto/paginate-request.dto";
import { PostGroupSortEnum, PostGroupFilterEnum } from "src/common/enums/post-group.enums"
import { Transform } from "class-transformer";

export class PaginatePostGroupRequestDto extends PaginateRequestDto {

  @IsEnum(PostGroupSortEnum)
  @IsOptional()
  orderBy: PostGroupSortEnum = PostGroupSortEnum.ID;

  @IsEnum(PostGroupFilterEnum)
  @IsOptional()
  filterBy?: PostGroupFilterEnum;

  @IsString()
  @IsOptional()
  search?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1; // Default page number

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10; // Default limit per page
}

