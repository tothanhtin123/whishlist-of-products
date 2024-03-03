import { Prop } from '@nestjs/mongoose';
import { BaseModel, Schema, createSchema } from 'src/common/base/base.model';
import { ProductCategory, ProductType } from '../product.enum';
import mongoose, { HydratedDocument } from 'mongoose';
import { StoredFileModel } from 'src/modules/file-storage/models/storaged-file';

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

  @Prop({
    type: mongoose.Schema.ObjectId,
  })
  thumbnailId?: string;
}

export type ProductDocument = HydratedDocument<ProductModel> & BaseModel;
export const ProductSchema = createSchema(ProductModel);

ProductSchema.index({ name: 'text' });
ProductSchema.virtual('thumbnail', {
  ref: StoredFileModel.name,
  localField: 'thumbnailId',
  foreignField: '_id',
  //just get the record has not removed yet
  match: { deletedAt: null },
  justOne: true,
});
