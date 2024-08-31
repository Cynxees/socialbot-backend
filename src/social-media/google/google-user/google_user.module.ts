import { Module } from '@nestjs/common';
import { GoogleUserController } from './google-user.controller';
import { GoogleUserService } from './google_user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleUserRepository } from './repositories/google-user.repository';

@Module({
  imports: [UserModule],
  controllers: [GoogleUserController],
  providers: [GoogleUserService, GoogleUserRepository],
  exports: [GoogleUserService]
})
export class GoogleUserModule {}
