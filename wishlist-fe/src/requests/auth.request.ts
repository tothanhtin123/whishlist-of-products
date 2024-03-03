import { LoginPayload, RegisterUserPayload, User } from "@/types/user";
import { api } from "@/utils/custom-axios";

const authApiPrefix = "/auth";

export const registerRequest = (data: RegisterUserPayload): ApiResponse<ApiSuccessData<User>> =>
  api.post(`${authApiPrefix}/register`, data);

export const loginRequest = (data: LoginPayload): ApiResponse<ApiSuccessData<User>> =>
  api.post(`${authApiPrefix}/login`, data);
