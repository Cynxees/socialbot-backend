import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { CreateFileRequestDto } from "../dto/create-file-request.dto";
import { PrismaService } from "src/_infrastructure/prisma/prisma.service";
import { File } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileRepository {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly prisma: PrismaService
  ){}

  async createFile(data: CreateFileRequestDto): Promise<File> {
    this.logger.start();

    const file = await this.prisma.file.create({
      data
    });

    this.logger.done();
    return file;
  }

  async findOne(id: number): Promise<File> {
    this.logger.start();

    const file = await this.prisma.file.findFirst({
      where: { id }
    });

    this.logger.done();
    return file;
  }
}