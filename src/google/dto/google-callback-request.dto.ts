import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class GoogleCallbackRequestDto {
  @IsString()
  accessToken: string;

  @IsString()
  tokenType: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  expiresIn: number;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value.split(' '), { toClassOnly: true })
  scope: string[];
}
