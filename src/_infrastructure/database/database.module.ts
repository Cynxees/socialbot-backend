import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSchema } from 'src/config/config.schema';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config =
          configService.getOrThrow<ConfigSchema['DATABASE']>('DATABASE');

        return {
          type: 'postgres',
          host: config.DATABASE_HOST,
          port: config.DATABASE_PORT,
          username: config.DATABASE_USERNAME,
          password: config.DATABASE_PASSWORD,
          database: config.DATABASE_NAME,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: [
            'dist/src/_infrastructure/database/migration/*{.ts,.js}',
          ],
          synchronize: true,
          autoLoadEntities: true,
          migrationsRun: config.DATABASE_MIGRATION_AUTO_RUN,
        };
      },
      async dataSourceFactory(options) {
        const datasource = new DataSource(options);
        return datasource;
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
