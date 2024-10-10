import { Module } from "@nestjs/common";
import { LoggerModule } from "src/_infrastructure/logger/logger.module";
import { MetaUserController } from "./meta-user.controller";
import { MetaUserService } from "./meta-user.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    LoggerModule,
    ConfigModule
  
  ],
  controllers: [MetaUserController],
  providers: [MetaUserService],
  exports: [MetaUserService],
})
export class MetaUserModule {}