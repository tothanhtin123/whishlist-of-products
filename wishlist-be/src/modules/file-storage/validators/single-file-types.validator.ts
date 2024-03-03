import { Injectable, FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export type SingleFileTypesValidatorOptions = { fileTypes: string[] };

@Injectable()
export class SingleFileTypesValidator extends FileValidator<
  SingleFileTypesValidatorOptions,
  IFile
> {
  isValid(file?: IFile): boolean | Promise<boolean> {
    if (!file) {
      return true;
    }
    return this.validationOptions.fileTypes.find((type) =>
      file.mimetype.startsWith(type.replace('*', '')),
    )
      ? true
      : false;
  }
  buildErrorMessage(): string {
    return `Expected type are in ${this.validationOptions.fileTypes}`;
  }
}
