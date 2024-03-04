import { ProductCategory, ProductType } from "@/app/enums/product.enum";
import { BaseModel } from "./base";
import { StoredFile } from "./stored-file";

export type Product = BaseModel & {
  name: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  thumbnail?: StoredFile;
};

export type ProductPayload = {
  name: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  thumbnailId?: string;
};
