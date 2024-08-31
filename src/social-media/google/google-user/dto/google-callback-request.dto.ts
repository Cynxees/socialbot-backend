import { BearerToken } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString } from 'class-validator';

export class GoogleCallbackRequestDto {
  @IsString()
  accessToken: string;

  @IsEnum(BearerToken)
  @IsString()
  tokenType: BearerToken;

  @Transform(({ value }) => {
    const seconds = parseInt(value, 10);
    return new Date(Date.now() + seconds * 1000);
  })
  @IsDate()
  expiresIn: Date;

  @Transform(({ value }) => {
    return value.split(' ')
  })
  @IsArray()
  @IsString({ each: true })
  scopes: string[];
}
