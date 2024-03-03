import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CommonConfigService } from '../shared/common-config/common-config.service';
import { memoryStorage } from 'multer';
import { MAX_EACH_FILE_SIZE } from './file-storage.const';
import { FileHelperService } from '../shared/file/file-helper.service';
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    private readonly config: CommonConfigService,
    private readonly fileHelper: FileHelperService,
  ) {}

  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      storage: memoryStorage(),
      limits: {
        //size of each file should not larger than 10MB
        fileSize: this.fileHelper.convertMbUnitToByteUnit(MAX_EACH_FILE_SIZE),
      },
    };
  }
}
