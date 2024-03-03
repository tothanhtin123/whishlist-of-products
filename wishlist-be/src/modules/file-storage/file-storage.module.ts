import { Module } from '@nestjs/common';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';
import { MulterConfigService } from './multer-config.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileHandlerModule } from './file-handler/file-handler.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StoredFileModel, StoredFileSchema } from './models/storaged-file';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StoredFileModel.name,
        schema: StoredFileSchema,
      },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    FileHandlerModule,
  ],
  controllers: [FileStorageController],
  providers: [FileStorageService],
})
export class FileStorageModule {}
