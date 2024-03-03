import type { AxiosError } from "axios";
import axios from "axios";

import { appConfig } from "@/consts/app-config";
import { localAuthService } from "@/services/auth/local-auth";

const baseURL = appConfig.API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const { accessToken } = localAuthService;
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const refreshTokenRequest = async (
  refreshToken?: string | null,
): Promise<{ accessToken: string }> => {
  const rs = await axios.post(`${baseURL}/auth/refresh`, null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return rs.data;
};

let isRefreshingToken = false;
let requestsToRefresh: any[] = [];

export const handleError = (error: AxiosError) => {
  const errorObjects: {
    status: number;
    message: string | string[];
  } = { status: -1, message: "" };
  if (error.response?.data) {
    const data: any = error.response?.data || { statusCode: 500, message: "Internal Error" };
    errorObjects.status = data.statusCode;
    errorObjects.message = data.message;
  } else {
    errorObjects.status = error.status || 500;
    errorObjects.message = error.message;
  }
  // Something happened in setting up the request that triggered an Error
  return errorObjects;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { response, config } = error;
    const status = response?.status;

    // refresh token
    if (status === 401) {
      if (!localAuthService.accessToken) {
        return Promise.reject(error);
      }

      // isRefreshingToken make sure only one request can send refresh token request
      if (!isRefreshingToken) {
        isRefreshingToken = true;

        // get new access token and run request again
        refreshTokenRequest(localAuthService.refreshToken)
          .then(({ accessToken }) => {
            // set new access token
            localAuthService.accessToken = accessToken;
            for (const callback of requestsToRefresh) {
              callback(accessToken);
            }
          })
          .catch((_refreshError) => {
            // clear token
            // localAuthService.logout();

            for (const callback of requestsToRefresh) {
              callback(undefined);
            }
          })
          .finally(() => {
            isRefreshingToken = false;
            requestsToRefresh = [];
          });
      }

      // create request to run through old config after get new access token
      return new Promise((resolve, reject) => {
        requestsToRefresh.push((token?: string) => {
          if (token && config) {
            resolve(api(config));
          }

          reject(error);
        });
      });
    }

    return Promise.reject(handleError(error));
  },
);
