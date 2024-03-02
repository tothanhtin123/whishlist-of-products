import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './modules/shared/shared.module';
import { CommonConfigService } from './modules/shared/common-config/common-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(SharedModule).get(CommonConfigService);
  const port = config.appConfig.port || 8000;

  await app.listen(port,()=>{
    Logger.log(`This app is running on port: ${port}`);
  });
}
bootstrap();
