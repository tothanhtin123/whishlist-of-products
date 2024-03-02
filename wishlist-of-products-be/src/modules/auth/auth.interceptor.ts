import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { UserInterceptor } from '../user/user.interceptor';

export const UseRegisterInterceptor = () =>
  applyDecorators(UseInterceptors(UserInterceptor));
