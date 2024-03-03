import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { errorMessages } from './file-storage.error';
import { FileStorageService } from './file-storage.service';

@Controller('file-storage')
export class FileStorageController {

    constructor(private readonly fileStorageService: FileStorageService){}

    @Post("upload-file")
    @UseUserGuard()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: UploadedFile){
        return this.fileStorageService.saveFile(file);
    }
}
