import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class ResponseSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<any>) {}
  intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function MongooseClassSerializerInterceptor(dto: any) {
  return UseInterceptors(new ResponseSerializeInterceptor(dto));
}
