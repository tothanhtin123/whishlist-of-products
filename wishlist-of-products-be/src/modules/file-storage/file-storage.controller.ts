import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { FileStorageService } from './file-storage.service';
import { User } from 'src/common/decorators/user.decorator';
import { UseStoredFileResponseInterceptor } from './file-storage.interceptor';

@Controller('file-storage')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post('upload-file')
  @UseUserGuard()
  @UseInterceptors(FileInterceptor('file'))
  @UseStoredFileResponseInterceptor()
  uploadFile(@UploadedFile() file: UploadedFile, @User() user: User) {
    return this.fileStorageService.saveFile(file, user.id);
  }

  @Delete('delete-file/:id')
  @UseUserGuard()
  @UseStoredFileResponseInterceptor()
  removeFile(@Param('id') id: string) {
    return this.fileStorageService.removeFile(id);
  }
}
