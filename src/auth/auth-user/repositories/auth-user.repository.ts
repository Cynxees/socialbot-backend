import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { PrismaService } from "src/_infrastructure/prisma/prisma.service";

@Injectable()
export class AuthUserRepository {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService
  ){}

  async findOneByUsername(username: string): Promise<User> {
    this.logger.start();

    const user = await this.prisma.user.findFirstOrThrow({
      where: { username: username }
    });

    this.logger.done();
    return user;
  }

}