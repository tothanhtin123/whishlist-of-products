import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const getBaseProperties = (
  status: number,
): Record<string, SchemaObject | ReferenceObject> => {
  return {
    status: { example: status },
    message: { example: 'success' },
  };
};

export const getPaginationProperties = (): Record<
  string,
  SchemaObject | ReferenceObject
> => {
  return {
    pagination: {
      properties: {
        limit: { example: 10 },
        page: { example: 1 },
        total: { example: 10 },
      },
    },
  };
};

export const getBaseSchema = (
  $ref: any,
  status = 200,
): SchemaObject & Partial<ReferenceObject> => {
  return {
    properties: {
      ...getBaseProperties(status),
      data: { $ref: getSchemaPath($ref) },
    },
  };
};

export const getPaginationSchema = (
  $ref: any,
  status = 200,
): SchemaObject & Partial<ReferenceObject> => {
  return {
    properties: {
      ...getBaseProperties(status),
      data: {
        type: 'array',
        items: {
          $ref: getSchemaPath($ref),
        },
      },
      ...getPaginationProperties(),
    },
  };
};

/**
 * Swagger for Create API
 * @param $ref Class Schema
 * @param name Schema Name
 * @example ApiCreate(User, 'user')
 */
export const ApiCreate = ($ref: any, name: string) =>
  applyDecorators(
    ApiOperation({ summary: 'Create new a/an' + name }),
    ApiCreatedResponse({
      description: 'Create new a/an ' + name + ' successfully',
      schema: getBaseSchema($ref, 201),
    }),
    ApiBadRequestResponse({
      description: 'Type of data is wrong or lacking of data in body',
    }),
    ApiConflictResponse({ description: 'Data is duplicated (created)' }),
  );

/**
 * Swagger for Get All (List) API
 * @param $ref Class Schema
 * @param name Schema Name
 * @example ApiGetAll(User, 'user')
 */
export const ApiGetAll = ($ref: any, name: string) =>
  applyDecorators(
    ApiOperation({ summary: 'Get ' + name + ' List' }),
    ApiOkResponse({
      description: 'Get ' + name + ' List' + ' successfully',
      schema: getPaginationSchema($ref),
    }),
  );

/**
 * Swagger for Get One (Details) API
 * @param $ref Class Schema
 * @param name Schema Name
 * @example ApiGetOne(User, 'user')
 */
export const ApiGetOne = ($ref: any, name: string) =>
  applyDecorators(
    ApiOperation({ summary: 'Get ' + name + ' details' }),
    ApiOkResponse({
      description: 'Get ' + name + ' details' + ' successfully',
      schema: getBaseSchema($ref),
    }),
    ApiNotFoundResponse({ description: name + ' is not found' }),
  );

/**
 * Swagger for Update API
 * @param $ref Class Schema
 * @param name Schema Name
 * @example ApiUpdate(User, 'user')
 */
export const ApiUpdate = ($ref: any, name: string) =>
  applyDecorators(
    ApiOperation({ summary: 'Update ' + name }),
    ApiOkResponse({
      description: 'Update ' + name + ' successfully',
      schema: getBaseSchema($ref),
    }),
    ApiBadRequestResponse({
      description: 'Type of data is wrong or lacking of data in body',
    }),
    ApiNotFoundResponse({ description: name + ' is not found' }),
  );

/**
 * Swagger for Delete API
 * @param $ref Class Schema
 * @param name Schema Name
 * @example ApiDelete(User, 'user')
 */
export const ApiDelete = ($ref: any, name: string) =>
  applyDecorators(
    ApiOperation({ summary: 'Delete ' + name }),
    ApiOkResponse({
      description: 'Delete ' + name + ' successfully',
      schema: getBaseSchema($ref),
    }),
    ApiNotFoundResponse({ description: name + ' is not found' }),
  );

/**
 * Swagger for hiding controller on production environment
 * @example ApiHideController()
 */
export const ApiHideController = () =>
  applyDecorators(ApiExcludeController(process.env.NODE_ENV === 'production'));
