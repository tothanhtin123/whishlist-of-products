import { Global, Module } from '@nestjs/common';
import { CommonConfigService } from './common-config/common-config.service';
import { JwtModule } from './jwt/jwt.module';

const providers = [CommonConfigService];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
  imports: [JwtModule],
})
export class SharedModule {}
