import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomLoggerService } from '../logger/logger.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTransactionService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

  async transaction<T>(actions: () => Promise<T>): Promise<T> {
    this.logger.start();

    return await this.prisma.$transaction(async (transactionPrisma) => {
      const originalPrisma = this.prisma;
      this.prisma = transactionPrisma as PrismaService;
      let result: T;

      try {
        result = await actions();
      } catch (error) {
        this.logger.error('Transaction failed: ', error);
        throw error;
      } finally {
        this.logger.log('Transaction successful');
        this.prisma = originalPrisma;
      }
      this.logger.done();
      return result;
    });
  }
}