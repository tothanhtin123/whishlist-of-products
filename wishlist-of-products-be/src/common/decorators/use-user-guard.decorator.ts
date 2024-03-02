import { UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthStrategy } from 'src/modules/auth/auth.enum';
import { AuthUserInterceptor } from '../interceptors/auth-user-interceptor.service';

/**
 *
 * @param strategy AuthStrategy (default = JWT)
 * @returns
 */
export const UseUserGuard = (strategy?: AuthStrategy) => {
  return applyDecorators(
    UseGuards(AuthGuard(strategy || AuthStrategy.JWT)),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized123' }),
  );
};
