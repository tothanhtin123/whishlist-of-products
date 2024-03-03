import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
@Injectable()
export class FileHelperService {
  convertMbUnitToByteUnit(mbValues: number) {
    return mbValues * 1024 * 1024;
  }
  extractFileExtension(fileName: string) {
    return fileName.split('.').pop() as string;
  }
  generateUniqueFilename(fileName: string): string {
    return `${uuid.v4()}.${this.extractFileExtension(fileName)}`;
  }
  createFilePath(fileName: string, folder?: string) {
    return [folder, fileName].filter((val) => val).join('/');
  }
}
