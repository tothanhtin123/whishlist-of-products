import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreate } from 'src/common/base/base.swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UseUserInterceptor } from './user.interceptor';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiCreate(UserResponseDto, 'User')
  @UseUserInterceptor()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
