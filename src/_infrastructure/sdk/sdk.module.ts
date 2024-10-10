import { Module } from "@nestjs/common";
import { SdkController } from "./sdk.controller";
import { SdkService } from "./sdk.service";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [LoggerModule],
  controllers: [SdkController],
  providers: [SdkService]
})
export class SdkModule{}