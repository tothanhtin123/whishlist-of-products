import { BadRequestException, Injectable } from '@nestjs/common';
import { errorMessages } from './file-storage.error';
import { FileHandlerService } from './file-handler/file-handler.service';

@Injectable()
export class FileStorageService {
  constructor(private readonly fileHandlerService: FileHandlerService) {}
  async saveFile(file: UploadedFile) {
    if (!file) {
      throw new BadRequestException(errorMessages.uploadedFileNotFound);
    }

    const saveResult = await this.fileHandlerService.save(file);

    //save file into model

    return saveResult;
  }
}
