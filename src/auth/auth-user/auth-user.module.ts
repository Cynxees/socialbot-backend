import { Module } from "@nestjs/common";
import { AuthUserRepository } from "./repositories/auth-user.repository";
import { AuthUserService } from "./auth-user.service";
import { LoggerModule } from "src/_infrastructure/logger/logger.module";

@Module({
  imports: [LoggerModule],
  providers: [AuthUserService, AuthUserRepository],
  exports: [AuthUserService] 
})
export class AuthUserModule {}