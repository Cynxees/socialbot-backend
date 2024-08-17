import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validate
    })
  ]
})
export class CustomConfigModule {}
