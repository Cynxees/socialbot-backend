import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { MetaUserModule } from './meta-user/meta-user.module';

@Module({
  imports: [LoggerModule, MetaUserModule],
})
export class MetaModule {}
