import { IsEnum, IsOptional } from "class-validator";
import { PaginateRequestDto } from "src/common/dto/paginate-request.dto"
import { PostFilterEnum, PostSortEnum } from 'src/common/enums/post.enums'

export class PaginatePostRequestDto extends PaginateRequestDto{
  
  @IsEnum(PostSortEnum)
  @IsOptional()
  orderBy: PostSortEnum = PostSortEnum.ID;
  
  @IsEnum(PostFilterEnum)
  @IsOptional()
  filterBy?: PostFilterEnum;
}