import { MongooseClassSerializerInterceptor } from "src/common/interceptors/response-serialize.interceptor";
import { ProductResponseDto } from "./dtos/product-response.dto";

export const UseCreateProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);

  export const UseGetProductInterceptor = () =>
  MongooseClassSerializerInterceptor(ProductResponseDto);