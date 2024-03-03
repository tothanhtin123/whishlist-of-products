import { FileHandlerProvider } from "./file-handler.enum"

export type SaveFileResult = {
    publicUrl: string,
    path:string,
    provider: FileHandlerProvider
}