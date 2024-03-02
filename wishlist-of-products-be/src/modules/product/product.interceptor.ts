import { MongooseClassSerializerInterceptor } from 'src/common/interceptors/response-serialize.interceptor';
import {
  ProductPaginatedResponse,
  ProductResponseDto,
} from './dtos/product-response.dto';

export const UseCreateProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);

export const UseGetProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);

export const UseGetManyProductsInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductPaginatedResponse);

export const UseDeleteProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);
export const UseUpdateProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);
