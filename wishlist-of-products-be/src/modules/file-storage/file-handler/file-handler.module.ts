import { Module } from '@nestjs/common';
import { FileHandlerService } from './file-handler.service';
import { FirebaseFileHandlerService } from './filebase-file-handler.service';

@Module({
    providers:[
        {
            provide: FileHandlerService,
            useClass: FirebaseFileHandlerService
        }
    ],
    exports:[FileHandlerService]
})
export class FileHandlerModule {}
