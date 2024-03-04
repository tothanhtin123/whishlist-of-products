import { PaginationPayload } from "@/types/pagination";
import { Product, ProductPayload } from "@/types/product";
import { api } from "@/utils/custom-axios";
import QueryString from "qs";

const productPrefix = "/product";

export const getProductsRequests = (
  data: PaginationPayload,
): ApiResponse<ApiSuccessPaginatedData<Product>> =>
  api.get(`${productPrefix}?${QueryString.stringify(data)}`);

export const createProductRequest = (data: ProductPayload): ApiResponse<ApiSuccessData<Product>> =>
  api.post(`${productPrefix}`, data);

export const updateProductRequest = (
  id: string,
  data: Partial<ProductPayload>,
): ApiResponse<ApiSuccessData<Product>> => api.patch(`${productPrefix}/${id}`, data);

export const deleteProductRequest = (id: string): ApiResponse<ApiSuccessData<Product>> =>
  api.delete(`${productPrefix}/${id}`);
