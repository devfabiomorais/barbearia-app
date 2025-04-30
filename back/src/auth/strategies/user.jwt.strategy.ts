import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { UserAuthService } from '../user-auth.service';
import { UserJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly userAuthService: UserAuthService) {
    super({
      jwtFromRequest: userAuthService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET_USER),
    });
  }

  async validate(payload: UserJwtPayload) {
    const user = await this.userAuthService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedError('Token inválido');
    }
    return user;
  }
}
