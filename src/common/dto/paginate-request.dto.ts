import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrderEnum } from 'src/common/enums/common.enums';

/**
 * MUST ADD:
 * @IsEnum(UserSortEnum)
 * @IsOptional()
 * orderBy: UserSortEnum = UserSortEnum.ID;
 *
 * @IsEnum(UserFilterEnum)
 * @IsOptional()
 * filterBy?: UserFilterEnum;
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

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @IsOptional()
  page?: number = 1; // Default page number

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  limit?: number = 10; // Default limit per page
}
