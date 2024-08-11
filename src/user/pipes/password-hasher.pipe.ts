import { ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';

@Injectable()
export class PasswordHasherPipe implements PipeTransform {

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    
    if(metadata.type !== 'body' || value.password == null) return value;
    
    this.logger.start();
    const rounds = this.configService.get<number>('HASH_ROUNDS');

    this.logger.log(`hashing password ${rounds} rounds`);
    const hashedPassword = await bcrypt.hash(value.password, +rounds);
    this.logger.done();

    value.password = hashedPassword;
    return value;
  }

}