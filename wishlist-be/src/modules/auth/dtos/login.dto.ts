import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'src/common/decorators/validation.decorator';

export class LoginDto {
  @ApiProperty({ description: 'Email of user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of user' })
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @IsNotEmpty()
  password: string;
}
