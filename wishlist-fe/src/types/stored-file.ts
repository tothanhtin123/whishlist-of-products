import { BaseModel } from "./base";

export type StorageFile = BaseModel & {
  id: string;

  name: string;

  mime: string;

  ext: string;

  size: number;

  publicUrl: string;
};
