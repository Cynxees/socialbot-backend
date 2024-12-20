import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { ValidatorEnum } from 'src/common/enums/common.enums';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserValidationConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly userService: UserService,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    this.logger.start();
    const [option] = args.constraints as [ValidatorEnum];
    const user = await this.userService.findOne('username', value);

    this.logger.done();
    if (option === ValidatorEnum.UNIQUE) return !user;
    if (option === ValidatorEnum.EXISTS) return !!user;

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const [option] = args.constraints as [ValidatorEnum];
    if (option === ValidatorEnum.UNIQUE) {
      return 'Username is already taken.';
    } else if (option === ValidatorEnum.EXISTS) {
      return 'Username does not exist.';
    }
    return 'Invalid username.';
  }
}

export function IsValidUsername(
  option: ValidatorEnum,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [option],
      validator: UserValidationConstraint,
    });
  };
}
