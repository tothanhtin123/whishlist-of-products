import { applyDecorators } from '@nestjs/common';
import * as validator from 'class-validator';

export const IsString = (validationOptions?: validator.ValidationOptions) =>
  applyDecorators(validator.IsString({ ...validationOptions }));

export const IsNotEmpty = (validationOptions?: validator.ValidationOptions) =>
  applyDecorators(
    validator.IsNotEmpty({
      ...validationOptions,
    }),
  );

export const IsEmail = (validationOptions?: validator.ValidationOptions) =>
  applyDecorators(validator.IsEmail({}, { ...validationOptions }));

export const IsNumber = (
  options?: validator.IsNumberOptions,
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.IsNumber(options, {
      ...validationOptions,
    }),
  );

export const IsNumberString = (
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.IsNumberString(
      {},
      {
        ...validationOptions,
      },
    ),
  );

export const IsDateString = (validationOptions?: validator.ValidationOptions) =>
  applyDecorators(
    validator.IsDateString(
      {},
      {
        ...validationOptions,
      },
    ),
  );

  export const IsEnum = (
    entity: object,
    validationOptions?: validator.ValidationOptions,
  ) =>
    applyDecorators(
      validator.IsEnum(entity, {
        ...validationOptions,
      }),
    );

export const Min = (
  minValue: number,
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.Min(minValue, {
      ...validationOptions,
    }),
  );

export const Max = (
  maxValue: number,
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.Max(maxValue, {
      ...validationOptions,
    }),
  );

export const MinLength = (
  minValue: number,
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.MinLength(minValue, {
      ...validationOptions,
    }),
  );
export const MaxLength = (
  maxValue: number,
  validationOptions?: validator.ValidationOptions,
) =>
  applyDecorators(
    validator.MaxLength(maxValue, {
      ...validationOptions,
    }),
  );
