import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import {
  UseLoginInterceptor,
  UseRegisterInterceptor,
  UseVerifyInterceptor,
} from './auth.interceptor';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '../shared/jwt/jwt.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { AuthStrategy } from './auth.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @UseRegisterInterceptor()
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const { email } = registerDto;
    const checkResult = await this.userService.checkUserExistsByEmail(email);
    if (!checkResult) {
      return this.userService.create(registerDto);
    }
    throw new ConflictException();
  }

  @Post('login')
  @UseUserGuard(AuthStrategy.LOCAL)
  @UseLoginInterceptor()
  async login(
    @Body() _loginDto: LoginDto,
    @User() user: User,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
    return Object.assign(user, { accessToken });
  }

  @Get('verify')
  @UseUserGuard(AuthStrategy.JWT)
  @UseVerifyInterceptor()
  async verify(@User() user: User) {
    return user;
  }
}
