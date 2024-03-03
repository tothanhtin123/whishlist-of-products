import { Module } from '@nestjs/common';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';
import { MulterConfigService } from './multer-config.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileHandlerModule } from './file-handler/file-handler.module';

@Module({
  imports:[
    MulterModule.registerAsync({
      useClass:MulterConfigService,
    }),
    FileHandlerModule
  ],
  controllers: [FileStorageController],
  providers: [FileStorageService],
})
export class FileStorageModule {}
