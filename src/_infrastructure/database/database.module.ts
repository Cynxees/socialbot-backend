import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSchema } from 'src/config/config.schema';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { LoggerModule } from '../logger/logger.module';
import { CustomLoggerService } from '../logger/logger.service';
import { datasourceOptions } from './data.source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, CustomLoggerService],
      useFactory: async (
        configService: ConfigService,
        logger: CustomLoggerService,
      ) => {
        const config =
          configService.getOrThrow<ConfigSchema['DATABASE']>('DATABASE');

        return {
          ...datasourceOptions,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/_infrastructure/database/migration/*{.ts,.js}'],
          synchronize: false,
          logger: 'advanced-console',
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
          migrationsRun: config.DATABASE_MIGRATION_AUTO_RUN,
        };
      },

      async dataSourceFactory(options) {
        //TODO: remove this console.log
        console.log('options', options);
        try {
          const datasource = new DataSource(options);
          return datasource;
        } catch (err) {
          console.error('failed when configuring datasource: ', err);
        }
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
