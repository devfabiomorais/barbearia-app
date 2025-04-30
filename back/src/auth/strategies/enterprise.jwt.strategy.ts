import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { EnterpriseAuthService } from '../enterprise-auth.service';
import { EnterpriseJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class EnterpriseJwtStrategy extends PassportStrategy(
  Strategy,
  'enterprise-jwt',
) {
  constructor(private readonly enterpriseAuthService: EnterpriseAuthService) {
    super({
      jwtFromRequest: enterpriseAuthService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: EnterpriseJwtPayload) {
    const user =
      await this.enterpriseAuthService.validateEnterpriseUser(payload);
    if (!user) {
      throw new UnauthorizedError('Token inválido');
    }
    return user;
  }
}
