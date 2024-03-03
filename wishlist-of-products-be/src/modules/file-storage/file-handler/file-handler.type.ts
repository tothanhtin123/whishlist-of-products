import { FileStorageProvider } from '../file-storage.enum';

export type SaveFileResult = {
  publicUrl: string;
  path: string;
  provider: FileStorageProvider;
};
