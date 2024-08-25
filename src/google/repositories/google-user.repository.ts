import { Injectable } from "@nestjs/common";
import { GoogleUser } from "@prisma/client";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { PrismaService } from "src/_infrastructure/prisma/prisma.service";

@Injectable()
export class GoogleUserRepository {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly prisma: PrismaService,
  ){}

  async findAll(): Promise<GoogleUser[]>{
    this.logger.start();

    const googleUsers = await this.prisma.googleUser.findMany();

    this.logger.done();
    return googleUsers;
  }

}