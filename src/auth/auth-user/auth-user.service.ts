import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { AuthUserRepository } from "./repositories/auth-user.repository";

@Injectable()
export class AuthUserService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly authUserRepository: AuthUserRepository
  ){}

  async findOneByUsername(username: string): Promise<User> {
    this.logger.start();
    const user = await this.authUserRepository.findOneByUsername(username);
    this.logger.done();
    return user;
  }

}