import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthLocalStrategy } from './strategies/auth-local.strategy';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy],
})
export class AuthModule {}
