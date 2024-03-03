import { Injectable, Logger } from '@nestjs/common';
import { FileHandlerService } from './file-handler.service';
import { SaveFileResult } from './file-handler.type';
import { FirebaseAdminService } from 'src/modules/shared/firebase/firebase-admin.service';
import { FileHelperService } from 'src/modules/shared/file/file-helper.service';
import { FileStorageProvider } from '../file-storage.enum';

@Injectable()
export class FirebaseFileHandlerService extends FileHandlerService {
  constructor(
    private readonly admin: FirebaseAdminService,
    private readonly fileHelper: FileHelperService,
  ) {
    super(fileHelper);
  }

  async save(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<SaveFileResult> {
    const path = this.fileHelper.createFilePath(
      this.fileHelper.generateUniqueFilename(file.originalname),
      folder,
    );
    const firebaseFile = this.admin.bucket.file(path);
    await firebaseFile.save(file.buffer, { contentType: file.mimetype });
    await firebaseFile.makePublic();
    return {
      publicUrl: firebaseFile.publicUrl(),
      path,
      provider: FileStorageProvider.FIREBASE,
    };
  }

  async remove(path: string): Promise<boolean> {
    const firebaseFile = this.admin.bucket.file(path);
    try {
      await firebaseFile.delete();
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
