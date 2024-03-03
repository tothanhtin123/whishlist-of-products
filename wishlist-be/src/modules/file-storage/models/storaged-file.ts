import { Prop } from '@nestjs/mongoose';
import { BaseModel, Schema, createSchema } from 'src/common/base/base.model';
import { HydratedDocument } from 'mongoose';
import { FileStorageProvider } from '../file-storage.enum';

@Schema('stored-file')
export class StoredFileModel extends BaseModel {
  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
  })
  mime: string;

  @Prop({
    isRequired: true,
  })
  ext: string;

  @Prop({
    isRequired: true,
  })
  size: number;

  @Prop({
    isRequired: true,
  })
  path: string;

  @Prop({
    isRequired: true,
  })
  publicUrl: string;

  @Prop({
    isRequired: true,
    enum: FileStorageProvider,
  })
  provider: FileStorageProvider;
}

export type StoredFileDocument = HydratedDocument<StoredFileModel> & BaseModel;
export const StoredFileSchema = createSchema(StoredFileModel);
