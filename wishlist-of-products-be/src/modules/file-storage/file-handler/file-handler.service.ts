import { FileHelperService } from "src/modules/shared/file/file-helper.service";
import { SaveFileResult } from "./file-handler.type";
export abstract class FileHandlerService{
    constructor(private readonly fileHelperService: FileHelperService){
        
    }
 
    abstract save(file: UploadedFile, folder?:string): Promise<SaveFileResult>
}