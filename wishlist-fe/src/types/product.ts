import { BaseModel } from "./base";
import { StorageFile } from "./stored-file";

export type Product = BaseModel & {
  name: string;
  category: string;
  type: string;
  price: number;
  thumbnail?: StorageFile;
};
