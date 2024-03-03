import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/common/base/base.dto';

export class StoredFileResponse extends BaseResponse {
  @Expose()
  name: string;

  @Expose()
  mime: string;

  @Expose()
  ext: string;

  @Expose()
  size: number;

  @Expose()
  publicUrl: string;
}
