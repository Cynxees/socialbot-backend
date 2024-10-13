import { Injectable } from "@nestjs/common";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { AuthUserRepository } from "./repositories/auth-user.repository";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthUserService {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly authUserRepository: AuthUserRepository
  ){}

  async findOneByUsername(username: string): Promise<User> {
    this.logger.start();
    const user = await this.authUserRepository.findOne({
      where: {
        username: username
      }
    });
    this.logger.done();
    return user;
  }

}