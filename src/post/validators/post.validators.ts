import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsArray,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { ValidatorEnum } from 'src/common/enums/common.enums';
import { PostService } from '../post.service';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';
import { Post } from '@prisma/client';

@Injectable()
@ValidatorConstraint({ async: true })
export class PostValidationConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly postService: PostService,
    private readonly logger: CustomLoggerService,
  ) {}

  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    this.logger.start();
    const [option] = args.constraints as [ValidatorEnum, keyof Post];
    const post = await this.postService.findOne('id', value);

    this.logger.done();
    if (option === ValidatorEnum.UNIQUE) return !post;
    if (option === ValidatorEnum.EXISTS) return !!post;

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const [option] = args.constraints as [ValidatorEnum];
    if (option === ValidatorEnum.UNIQUE) {
      return `${args.property} is already in use.`;
    } else if (option === ValidatorEnum.EXISTS) {
      return `${args.property} does not exist.`;
    }
    return `Invalid ${args.property}.`;
  }
}

// Tag Validator for ensuring tags start with '@'
@ValidatorConstraint({ name: 'IsValidTag', async: false })
export class IsValidTagConstraint implements ValidatorConstraintInterface {
  validate(tag: string, args: ValidationArguments): boolean {
    // Ensure the tag starts with '@'
    return typeof tag === 'string' && tag.startsWith('@');
  }

  defaultMessage(args: ValidationArguments): string {
    return `Tag ${args.value} must start with '@'.`;
  }
}

export function IsValidTag(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidTagConstraint,
    });
  };
}
