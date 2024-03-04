import { BaseModel } from "./base";

export type User = BaseModel & {
  email: string;
  fullName: string;
  accessToken?: string;
};

export type RegisterUserPayload = {
  email: string;
  fullName: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
