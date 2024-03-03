import { MongooseClassSerializerInterceptor } from 'src/common/interceptors/response-serialize.interceptor';
import { StoredFileResponseDto } from './dtos/stored-file-response.dto';

export const UseStoredFileResponseInterceptor = () =>
  MongooseClassSerializerInterceptor(StoredFileResponseDto);
