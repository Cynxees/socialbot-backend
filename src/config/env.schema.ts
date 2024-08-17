import { IsString, IsNumber } from "class-validator";

export class DatabaseSchema {
  @IsString()
  DATABASE_URL: string;
}

export class SecretSchema {
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  HASH_ROUNDS: number;
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