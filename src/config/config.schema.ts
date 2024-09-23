import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AppSchema, AwsSchema, DatabaseSchema, GoogleSchema, MetaSchema, SecretSchema } from './env.schema';

export class ConfigSchema {
  APP: AppSchema;
  DATABASE: DatabaseSchema;
  SECRET: SecretSchema;
  META: MetaSchema;
  GOOGLE: GoogleSchema;
  AWS: AwsSchema;
}

export function validate(config: Record<string, unknown>) {
  
  const appConfig = plainToInstance(AppSchema, config, { enableImplicitConversion: true });
  const databaseConfig = plainToInstance(DatabaseSchema, config, { enableImplicitConversion: true });
  const secretConfig = plainToInstance(SecretSchema, config, { enableImplicitConversion: true });
  const metaConfig = plainToInstance(MetaSchema, config, { enableImplicitConversion: true });
  const googleConfig = plainToInstance(GoogleSchema, config, { enableImplicitConversion: true });
  const awsConfig = plainToInstance(AwsSchema, config, { enableImplicitConversion: true });

  const errors = [
    ...validateSync(appConfig, { skipMissingProperties: false }),
    ...validateSync(databaseConfig, { skipMissingProperties: false }),
    ...validateSync(secretConfig, { skipMissingProperties: false }),
    ...validateSync(metaConfig, { skipMissingProperties: false }),
    ...validateSync(googleConfig, { skipMissingProperties: false }),
    ...validateSync(awsConfig, { skipMissingProperties: false }),
  ];

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return {
    APP: appConfig,
    DATABASE: databaseConfig,
    SECRET: secretConfig,
    META: metaConfig,
    GOOGLE: googleConfig,
    AWS: awsConfig,
  };
}
