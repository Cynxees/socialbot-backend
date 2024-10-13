import { Transform } from "class-transformer";
import { IsString, IsNumber, IsBoolean, IsBooleanString } from "class-validator";

export class AppSchema {
  @IsString()
  APP_NAME: string;
}

export class DatabaseSchema {

  @IsString()
  DATABASE_URL: string;
  
  @IsString()
  DATABASE_HOST: string
  
  @IsNumber()
  DATABASE_PORT: number

  @IsString()
  DATABASE_USERNAME: string

  @IsString()
  DATABASE_PASSWORD: string

  @IsString()
  DATABASE_NAME: string

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  DATABASE_MIGRATION_AUTO_RUN: boolean
}

export class SecretSchema {
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  HASH_ROUNDS: number;

  @IsString()
  HASH_SALT: string;
}

export class MetaSchema {
  @IsString()
  META_APP_ID: string;

  @IsString()
  META_APP_SECRET: string;
}

export class GoogleSchema {
  @IsString()
  GOOGLE_API_CREDENTIALS: string;

  @IsString()
  GOOGLE_OAUTH_CLIENT_ID: string;

  @IsString()
  GOOGLE_OAUTH_CLIENT_SECRET: string;

  @IsString()
  GOOGLE_OAUTH_REDIRECT_URI: string;
}

export class AwsSchema {
  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_S3_ACCESS_POINT_ARN: string;

  @IsString()
  AWS_S3_BUCKET_ARN: string;

  @IsString()
  AWS_S3_BUCKET_NAME: string;
}