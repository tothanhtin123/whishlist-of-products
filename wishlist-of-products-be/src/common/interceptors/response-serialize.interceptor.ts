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
        //fix error when mongo model (data) put all data of it into _doc field
        //we need to get them in _doc
        if (data?._doc) {
          data = {
            ...data,
            ...data._doc,
          };
        }
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
