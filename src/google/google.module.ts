import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [LoggerModule, UserModule],
  controllers: [GoogleController],
  providers: [GoogleService]
})
export class GoogleModule {}
