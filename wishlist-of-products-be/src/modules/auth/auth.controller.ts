import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import {
  UseLoginInterceptor,
  UseRegisterInterceptor,
} from './auth.interceptor';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '../shared/jwt/jwt.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';

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
  @UseLoginInterceptor()
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userService.validUserByEmailAndPassword(
      email,
      password,
    );
    const accessToken = await this.jwtService.sign({ email, id: user.id });
    return {
      ...user,
      accessToken,
    };
  }
}
