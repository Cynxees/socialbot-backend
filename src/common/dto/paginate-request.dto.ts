import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrderEnum } from "src/infrastructure/config/enums/common.enums";

/**
 * MUST ADD: 
  @IsEnum(UserSortEnum)
  @IsOptional
  orderBy: UserSortEnum = UserSortEnum.ID;
  
  @IsEnum(UserFilterEnum)
  @IsOptional
  filterBy?: UserFilterEnum;
 */
export class PaginateRequestDto {
  
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsEnum(SortOrderEnum)
  @IsOptional()
  order: SortOrderEnum = SortOrderEnum.ASC;

  @IsString()
  @IsOptional()
  filterBy?: string;

  @IsString()
  @IsOptional()
  filter?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  skip?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  take?: number;
}
