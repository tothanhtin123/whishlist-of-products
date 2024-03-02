import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'src/common/decorators/validation.decorator';

export class CreateUserDto {
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

  @ApiProperty({ description: 'Full name of User' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  fullName: string;
}
