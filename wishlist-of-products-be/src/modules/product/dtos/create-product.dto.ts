import { IsNotEmpty, IsString, MaxLength, MinLength, IsEnum, IsNumber, Min } from "src/common/decorators/validation.decorator";
import { ProductCategory, ProductType } from "../product.enum";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(250)
    name: string;

    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @IsNotEmpty()
    @IsEnum(ProductType)
    type: ProductType;

    @IsNotEmpty()
    @IsNumber()
    @Min(1000)
    price: number;
}