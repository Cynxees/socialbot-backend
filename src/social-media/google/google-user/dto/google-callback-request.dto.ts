import { ApiProperty } from '@nestjs/swagger';
import { Token } from 'src/common/enums/token.enums';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString } from 'class-validator';

export class GoogleCallbackRequestDto {
  @IsString()
  authorizationCode: string;

  /**
   * @example bearer
   */
  @IsEnum(Token)
  @IsString()
  tokenType: Token;

  /**
   * @example 3600
   */
  @Transform(({ value }) => {
    const seconds = parseInt(value, 10);
    return new Date(Date.now() + seconds * 1000);
  })
  @IsDate()
  expiresIn: Date;

  /**
   * @example 'Youtube_Profile'
   */
  @ApiProperty({
    type: 'string',
    description: 'Seperated with space'
  })
  @Transform(({ value }) => {
    return value.split(' ')
  })
  @IsArray()
  @IsString({ each: true })
  scopes: string[];
}
