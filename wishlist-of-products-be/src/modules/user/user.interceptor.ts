import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UseInterceptors,
	applyDecorators
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UserInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: UserModel) => {
				return plainToInstance(UserResponseDto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}

// @Injectable()
// export class UserPaginatedInterceptor implements NestInterceptor {
// 	intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
// 		return handler.handle().pipe(
// 			map((userPaginated: IPaginationResponse<UserModel>) => {
// 				return plainToInstance(UserPaginatedResponse, userPaginated, {
// 					excludeExtraneousValues: true
// 				});
// 			})
// 		);
// 	}
// }

export const UseUserInterceptor = () => applyDecorators(UseInterceptors(UserInterceptor));

// export const UseUserPaginatedInterceptor = () =>
// 	applyDecorators(UseInterceptors(UserPaginatedInterceptor));
