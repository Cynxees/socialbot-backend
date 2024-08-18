import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './_infrastructure/infrastructure.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommonModule } from './common/common.module';
import { CustomConfigModule } from './config/config.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InfrastructureModule, CustomConfigModule, CommonModule, UserModule, PostModule, FileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
