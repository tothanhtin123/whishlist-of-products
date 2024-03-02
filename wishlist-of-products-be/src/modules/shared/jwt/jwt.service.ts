import { Injectable } from '@nestjs/common';
import { JwtSignOptions, JwtService as NestJwtService } from '@nestjs/jwt';
@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: JwtPayload, options?: JwtSignOptions) {
    return this.nestJwtService.signAsync(payload, options);
  }
  async verify(token: string) {
    return this.nestJwtService.verifyAsync(token);
  }
}
