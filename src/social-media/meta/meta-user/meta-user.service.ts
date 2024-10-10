import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FacebookAdsApi } from "facebook-nodejs-business-sdk";
import { CustomLoggerService } from "src/_infrastructure/logger/logger.service";
import { ConfigSchema } from "src/config/config.schema";

@Injectable()
export class MetaUserService{

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService
  ){
    
  }

  async createMetaUser(){
    this.logger.start();

    const config = this.configService.getOrThrow<ConfigSchema['META']>('META')

    const accessToken = 'IGQWRQekxib3RBZAVROd1hYZADloUjFENzZAsVkFoMGlrUG1tQ3pyUU16Mk50OEpBaTZAKd3pyWWh0amo1QmppMjVQQ3ZAWUnl1TGxuY0lwUmprRlJFOTE5Ny0zVXUtc3RFd2lVWDJLei1VU0ZAmWFNiOHRkMnJRRlExNXcZD'
    
    this.logger.log('init facebook api')
    const api = new FacebookAdsApi(config.META_APP_SECRET);

    console.debug(api)
    this.logger.log('getting app id')
    const appId =  await api.getAppID()

    this.logger.done();
    return  appId;
  }

}