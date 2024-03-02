import { LoginResponseDto } from './dtos/login-response.dto';
import { MongooseClassSerializerInterceptor } from 'src/common/interceptors/response-serialize.interceptor';
import { RegisterResponseDto } from './dtos/register-response.dto';

export const UseRegisterInterceptor = () =>
  MongooseClassSerializerInterceptor(RegisterResponseDto);

export const UseLoginInterceptor = () =>
  MongooseClassSerializerInterceptor(LoginResponseDto);
