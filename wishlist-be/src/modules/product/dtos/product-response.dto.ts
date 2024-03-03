import { Expose, Type } from 'class-transformer';
import { BaseResponse, IPagination } from 'src/common/base/base.dto';
import { ProductCategory, ProductType } from '../product.enum';
import { StoredFileResponseDto } from 'src/modules/file-storage/dtos/stored-file-response.dto';

export class ProductResponseDto extends BaseResponse {
  @Expose()
  name: string;

  @Expose()
  category: ProductCategory;

  @Expose()
  type: ProductType;

  @Expose()
  price: number;

  @Expose()
  @Type(() => StoredFileResponseDto)
  thumbnail?: StoredFileResponseDto;
}

export class ProductPaginatedResponse {
  @Expose()
  @Type(() => ProductResponseDto)
  data: ProductResponseDto[];

  @Expose()
  pagination: IPagination;
}
