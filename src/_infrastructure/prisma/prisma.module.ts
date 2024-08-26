import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LoggerModule } from '../logger/logger.module';
import { PrismaTransactionService } from './prisma-transaction.service';

@Module({
  imports: [
    LoggerModule,
  ],
  providers: [PrismaService, PrismaTransactionService],
  exports: [PrismaService, PrismaTransactionService],
})
export class PrismaModule {}
