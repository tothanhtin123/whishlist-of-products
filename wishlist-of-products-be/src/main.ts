import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './modules/shared/shared.module';
import { CommonConfigService } from './modules/shared/common-config/common-config.service';
import { Logger, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(SharedModule).get(CommonConfigService);
  const port = config.appConfig.port || 8000;

  app.use(helmet());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (config.appConfig.enableDoc) {
    setupSwagger(app);
  }

  await app.listen(port, () => {
    Logger.log(`This app is running on port: ${port}`);
  });
}
bootstrap();
