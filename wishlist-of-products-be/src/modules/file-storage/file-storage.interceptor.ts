import { MongooseClassSerializerInterceptor } from 'src/common/interceptors/response-serialize.interceptor';
import { StoredFileResponse } from './dtos/stored-file-response.dto';

export const UseStoredFileResponseInterceptor = () =>
  MongooseClassSerializerInterceptor(StoredFileResponse);
