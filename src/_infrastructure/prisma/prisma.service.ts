import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor(
    private readonly logger: CustomLoggerService,
  ){
    super();
  }

  async onModuleInit() {
    this.logger.start();
    await this.$connect();
    this.logger.done()
  }
}