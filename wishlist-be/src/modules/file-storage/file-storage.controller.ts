import {
  Controller,
  Delete,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { FileStorageService } from './file-storage.service';
import { User } from 'src/common/decorators/user.decorator';
import { UseStoredFileResponseInterceptor } from './file-storage.interceptor';
import { FileHelperService } from '../shared/file/file-helper.service';
import { MAX_EACH_FILE_SIZE, fileTypesAccepted } from './file-storage.const';
import { SingleFileTypesValidator } from './validators/single-file-types.validator';

@Controller('file-storage')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post('upload-file')
  @UseUserGuard()
  @UseInterceptors(FileInterceptor('file'))
  @UseStoredFileResponseInterceptor()
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: new FileHelperService().convertMbUnitToByteUnit(
              MAX_EACH_FILE_SIZE,
            ),
          }),
          new SingleFileTypesValidator({ fileTypes: fileTypesAccepted }),
        ],
      }),
    )
    file: UploadedFile,
    @User() user: User,
  ) {
    return this.fileStorageService.saveFile(file, user.id);
  }

  @Delete('delete-file/:id')
  @UseUserGuard()
  @UseStoredFileResponseInterceptor()
  removeFile(@Param('id') id: string) {
    return this.fileStorageService.removeFile(id);
  }
}
