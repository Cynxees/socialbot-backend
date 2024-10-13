import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { GoogleUser } from "../entities/google-user.entity";

@Injectable()
export class GoogleUserRepository extends Repository<GoogleUser> {

  constructor(private readonly ds: DataSource) {
    super(GoogleUser, ds.createEntityManager());
  }

}