import { UserResponseDto } from './dtos/user-response.dto';
import { MongooseClassSerializerInterceptor } from 'src/common/interceptors/response-serialize.interceptor';

export const UseUserInterceptor = () =>
  MongooseClassSerializerInterceptor(UserResponseDto);
