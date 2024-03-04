import { StoredFile } from "@/types/stored-file";
import { api } from "@/utils/custom-axios";

const fileStoragePrefix = "/file-storage";

export const uploadSingleFileRequest = (data: FormData): ApiResponse<ApiSuccessData<StoredFile>> =>
  api.post(`${fileStoragePrefix}/upload-file`, data, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });
