import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { CommonConfigService } from '../common-config/common-config.service';
@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [CommonConfigService],
      useFactory: (config: CommonConfigService) => ({
        global: true,
        privateKey: config.authConfig.privateKey,
        publicKey: config.authConfig.publicKey,
        signOptions: {
          expiresIn: config.authConfig.jwtATExpirationTime,
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
