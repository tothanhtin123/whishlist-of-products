import { authTokenKeys } from "@/consts/token";

class LocalAuthTokenService {
  ACCESS_TOKEN = authTokenKeys.accessToken;

  REFRESH_TOKEN = authTokenKeys.refreshToken;

  setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  clearAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  clearRefreshToken() {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  clearAllAuthToken() {
    for (const key of [this.ACCESS_TOKEN, this.REFRESH_TOKEN]) {
      localStorage.removeItem(key);
    }
  }
}

const localAuthTokenService = new LocalAuthTokenService();

export { LocalAuthTokenService, localAuthTokenService };
