import { BearerToken } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class GoogleCallbackRequestDto {
  @IsString()
  accessToken: string;

  @IsString()
  tokenType: BearerToken;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  expiresIn: Date;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value.split(' '), { toClassOnly: true })
  scope: string[];
}
