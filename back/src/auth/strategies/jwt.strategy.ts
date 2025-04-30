import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { EnterpriseAuthService } from '../enterprise-auth.service';
import { EnterpriseJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: EnterpriseAuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: EnterpriseJwtPayload) {
    const user = await this.authService.validateEnterpriseUser(payload);
    if (!user) {
      throw new UnauthorizedError('invalid token');
    }
    return user;
  }
}
