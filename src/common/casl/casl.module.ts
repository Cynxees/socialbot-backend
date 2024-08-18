import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { LoggerModule } from 'src/_infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}
