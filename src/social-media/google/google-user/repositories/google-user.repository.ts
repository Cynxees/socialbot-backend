import { Injectable } from "@nestjs/common";
import { GoogleUser } from "@prisma/client";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { PrismaService } from "src/_infrastructure/prisma/prisma.service";
import { CreateGoogleUserRequest } from "../dto/create-google-user-request.dto";
import { UpdateGoogleUserRequest } from "../dto/update-google-user-request.dto";

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

  async findOne(id: number): Promise<GoogleUser>{
    this.logger.start();
    this.logger.log(`finding google user with id ${id}`);

    const googleUser = await this.prisma.googleUser.findFirst({where: {id: id}});

    this.logger.done();
    return googleUser;
  }
  
  async findOneOrThrow(id: number): Promise<GoogleUser>{
    this.logger.start();
    const googleUser = await this.prisma.googleUser.findFirstOrThrow({where: {id}});

    this.logger.done();
    return googleUser;
  }

  async create(data: CreateGoogleUserRequest): Promise<GoogleUser>{
    this.logger.start();

    const googleUser = await this.prisma.googleUser.create({ data });

    this.logger.done();
    return googleUser;
  }

  async update(id: number, data: UpdateGoogleUserRequest): Promise<GoogleUser>{
    this.logger.start();

    const googleUser = await this.prisma.googleUser.update({
      where: { id: id },
      data: { ...data },
    });

    this.logger.done();
    return googleUser;
  }
}