import { LocalAuthTokenService } from './local-auth-token';

class LocalAuthService {
  localAuthTokenService: LocalAuthTokenService;

  constructor(localAuthTokenService: LocalAuthTokenService) {
    this.localAuthTokenService = localAuthTokenService;
  }

  get accessToken(): string | null {
    return this.localAuthTokenService.getAccessToken();
  }

  set accessToken(token: string) {
    this.localAuthTokenService.setAccessToken(token);
  }

  get refreshToken(): string | null {
    return this.localAuthTokenService.getRefreshToken();
  }

  set refreshToken(token: string) {
    this.localAuthTokenService.setRefreshToken(token);
  }

  login(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  logout() {
    this.localAuthTokenService.clearAllAuthToken();
  }
}

const localAuthService = new LocalAuthService(new LocalAuthTokenService());
export { LocalAuthService, localAuthService };
