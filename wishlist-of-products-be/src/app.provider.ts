import { Provider, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';

export const providers: Provider[] = [
  AppService,
  {
    provide: APP_PIPE,
    useFactory() {
      return new ValidationPipe({ transform: true, whitelist: true });
    },
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: FormatResponseInterceptor,
  },
];
