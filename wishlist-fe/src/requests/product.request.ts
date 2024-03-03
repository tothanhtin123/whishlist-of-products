import { PaginationPayload } from "@/types/pagination";
import { Product } from "@/types/product";
import { api } from "@/utils/custom-axios";
import QueryString from "qs";

const productPrefix = "/product";

export const getProductsRequests = (
  data: PaginationPayload,
): ApiResponse<ApiSuccessPaginatedData<Product>> =>
  api.get(`${productPrefix}?${QueryString.stringify(data)}`);
