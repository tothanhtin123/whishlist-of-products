import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from 'src/common/base/base.dto';

export class UserResponseDto extends BaseResponse {
  @ApiProperty({ description: 'Email' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Full name of User' })
  @Expose()
  fullName: string;
}
