import { Global, Module } from '@nestjs/common';
import { CommonConfigService } from './common-config/common-config.service';


const providers = [CommonConfigService];

@Global()
@Module({
  providers: [...providers],
  exports:[...providers],
})
export class SharedModule {}
