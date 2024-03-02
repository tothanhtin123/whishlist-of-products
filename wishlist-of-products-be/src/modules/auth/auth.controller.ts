import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import { UseRegisterInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseRegisterInterceptor()
  async register(@Body() registerDto: RegisterDto) {
    const { email } = registerDto;
    const checkResult = await this.userService.checkUserExistsByEmail(email);
    if (!checkResult) {
      return this.userService.create(registerDto);
    }
    throw new ConflictException();
  }
}
