import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CaslModule } from 'src/common/casl/casl.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [
    LoggerModule,
    PassportModule,
    ConfigModule,
    CaslModule,
    AuthUserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      })
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, LocalStrategy, AuthService]
})
export class AuthModule {}
