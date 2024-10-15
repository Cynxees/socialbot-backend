import * as dotenv from 'dotenv';
import * as path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const migrations = path.resolve(__dirname + '/migration/**/*.js');

const envPath = path.resolve(__dirname + '../../../../.env');

dotenv.config({
  path: envPath,
});

const databaseConfig = process.env;

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: databaseConfig.DATABASE_HOST,
  port: Number(databaseConfig.DATABASE_PORT),
  username: databaseConfig.DATABASE_USERNAME,
  password: databaseConfig.DATABASE_PASSWORD,
  database: databaseConfig.DATABASE_NAME,
  migrations: [migrations],
  logging: true,
  ssl:
    databaseConfig.DATABASE_SSL_ENABLED === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

export const AppDataSource = new DataSource(datasourceOptions);
