import { BadRequestException, Injectable } from '@nestjs/common';
import { errorMessages } from './file-storage.error';
import { FileHandlerService } from './file-handler/file-handler.service';
import { BaseService } from 'src/common/base/base.service';
import { StoredFileModel } from './models/storaged-file';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileHelperService } from '../shared/file/file-helper.service';

@Injectable()
export class FileStorageService extends BaseService<StoredFileModel> {
  notFoundMessage: string = errorMessages.fileNotFound;
  constructor(
    @InjectModel(StoredFileModel.name) storedModel: Model<StoredFileModel>,
    private readonly fileHandlerService: FileHandlerService,
    private readonly fileHelper: FileHelperService,
  ) {
    super(storedModel);
  }
  async saveFile(file: UploadedFile, userId: string) {
    if (!file) {
      throw new BadRequestException(errorMessages.uploadedFileNotFound);
    }

    const saveResult = await this.fileHandlerService.save(file);

    //save file into model
    return this.create({
      name: file.originalname,
      mime: file.mimetype,
      ext: this.fileHelper.extractFileExtension(file.mimetype),
      size: file.size,
      path: saveResult.path,
      publicUrl: saveResult.publicUrl,
      provider: saveResult.provider,
      createdById: userId,
      updatedById: userId,
    });
  }
}
