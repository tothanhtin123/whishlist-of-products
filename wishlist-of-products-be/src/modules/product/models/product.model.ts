import { Prop } from '@nestjs/mongoose';
import { BaseModel, Schema, createSchema } from 'src/common/base/base.model';
import { ProductCategory, ProductType } from '../product.enum';
import { HydratedDocument } from 'mongoose';

@Schema('product')
export class ProductModel extends BaseModel {
  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Prop({
    isRequired: true,
    enum: ProductType,
  })
  type: ProductType;

  @Prop({
    isRequired: true,
  })
  price: number;
}

export type ProductDocument = HydratedDocument<ProductModel> & BaseModel;
export const ProductSchema = createSchema(ProductModel);

ProductSchema.index({ name: 'text' });
