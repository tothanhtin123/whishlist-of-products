import { Type, applyDecorators } from '@nestjs/common';
import {
  Schema as NestMongooseSchema,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserModel } from 'src/modules/user/models/user.model';

export class BaseModel {
  /** ObjectId */
  id!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;

  @Prop({
    type: mongoose.Schema.ObjectId,
  })
  createdById?: string;

  @Prop({
    type: mongoose.Schema.ObjectId,
  })
  updatedById?: string;
}

export const Schema = (collection?: string) =>
  applyDecorators(
    NestMongooseSchema({ timestamps: true, versionKey: false, collection }),
  );

export const createSchema = (target: Type<BaseModel>) => {
  const schema = SchemaFactory.createForClass(target);
  schema.set('toJSON', {
    virtuals: true,
  });
  schema.set('toObject', {
    virtuals: true,
  });
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.virtual('createdBy', {
    ref: UserModel.name,
    localField: 'createdById',
    foreignField: '_id',
    justOne: true,
  });
  schema.virtual('updatedBy', {
    ref: UserModel.name,
    localField: 'createdById',
    foreignField: '_id',
    justOne: true,
  });
  return schema;
};
