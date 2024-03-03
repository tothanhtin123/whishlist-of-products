import { Expose } from 'class-transformer';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';

export class LoginResponseDto extends UserResponseDto {
  @Expose()
  accessToken: string;
}
