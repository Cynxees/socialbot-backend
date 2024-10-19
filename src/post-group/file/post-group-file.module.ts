import { Module } from "@nestjs/common";
import { LoggerModule } from "src/_infrastructure/logger/logger.module";
import { PostGroupFileRepository } from "./post-group-file.repository";
import { PostGroupFileService } from "./post-group-file.service";

@Module({
  imports: [LoggerModule],
  providers: [PostGroupFileRepository, PostGroupFileService],
  exports: [PostGroupFileService]
})
export class PostGroupFileModule{}