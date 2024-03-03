import { RegisterUserPayload, User } from "@/types/user";
import { api } from "@/utils/custom-axios";

const authApiPrefix = "/auth";

export const registerRequest = (data: RegisterUserPayload): ApiResponse<ApiSuccessData<User>> =>
  api.post(`${authApiPrefix}/register`, data);
