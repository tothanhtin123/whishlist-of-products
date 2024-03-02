import { createParamDecorator } from '@nestjs/common';
import { UserContext } from '../providers/user-context.provider';

export const User = createParamDecorator(() => {
  return new UserContext().get();
});
