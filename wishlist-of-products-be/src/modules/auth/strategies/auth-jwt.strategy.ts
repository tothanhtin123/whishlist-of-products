import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthStrategy } from '../auth.enum';
import { CommonConfigService } from 'src/modules/shared/common-config/common-config.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.JWT,
) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: CommonConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.authConfig.privateKey,
    });
  }

  async validate(payload: UserJwtPayload) {
    const { id } = payload;
    const service = this.authService.getUserService();
    return service.validUserById(id);
  }
}
