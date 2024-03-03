import { Global, Module } from '@nestjs/common';
import { CommonConfigService } from './common-config/common-config.service';
import { JwtModule } from './jwt/jwt.module';
import { FirebaseAdminService } from './firebase/firebase-admin.service';

const providers = [CommonConfigService, FirebaseAdminService];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
  imports: [JwtModule],
})
export class SharedModule {}
