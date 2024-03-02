import { Expose } from "class-transformer";
import { BaseResponse } from "src/common/base/base.dto";
import { ProductCategory, ProductType } from "../product.enum";

export class ProductResponseDto extends BaseResponse{
    @Expose()
    name: string;

    @Expose()
    category: ProductCategory;

    @Expose()
    type: ProductType;

    @Expose()
    price: number;
}