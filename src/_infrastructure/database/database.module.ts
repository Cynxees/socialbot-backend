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
          url: config.DATABASE_URL,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: [
            'dist/src/_infrastructure/database/migration/*{.ts,.js}',
          ],
          synchronize: true,
          autoLoadEntities: true,
          migrationsRun: config.DATABASE_MIGRATION_AUTO_RUN,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      async dataSourceFactory(options) {
        console.log('options', options);
        try{
          
          const datasource = new DataSource(options);
          return datasource;
        }catch(err){
          console.error('failed when configuring datasource: ', err);
        }
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
