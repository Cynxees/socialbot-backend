import { IsEnum, IsOptional } from "class-validator";
import { PaginateRequestDto } from "src/common/dto/paginate-request.dto"
import { UserFilterEnum, UserSortEnum } from 'src/infrastructure/config/enums/user.enums'

export class PaginateUserRequestDto extends PaginateRequestDto{
  
  @IsEnum(UserSortEnum)
  @IsOptional()
  orderBy: UserSortEnum = UserSortEnum.ID;
  
  @IsEnum(UserFilterEnum)
  @IsOptional()
  filterBy?: UserFilterEnum;
}