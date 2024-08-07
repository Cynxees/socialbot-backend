import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [InfrastructureModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
