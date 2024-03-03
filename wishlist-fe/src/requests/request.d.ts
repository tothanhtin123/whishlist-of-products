import type { AxiosResponse } from "axios";

declare global {
  type ApiPaginationMetaData = { limit: number; page: number; total: number };
  type ApiSuccessData<T> = { data: T; message: string; status: number };
  type ApiSuccessPaginatedData<T> = ApiSuccessData<T> & {
    pagination: ApiPaginationMetaData;
  };
  type ApiResponse<T> = Promise<AxiosResponse<T>>;
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};
