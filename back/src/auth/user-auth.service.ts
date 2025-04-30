import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import ms from 'ms';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserAuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async createAccessToken(userData: UserJwtPayload) {
    return sign(userData, String(process.env.JWT_SECRET_USER), {
      expiresIn: String(process.env.JWT_EXPIRATION || '7d') as ms.StringValue,
    });
  }

  public async validateUser(jwtPayload: UserJwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: jwtPayload?.userId,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    return user;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new BadRequestException('JWT não enviado.');
    }
    const [, token] = authHeader.split(' ');

    return token;
  }

  public async extractDataFromToken(token: string) {
    try {
      const decoded = verify(
        token,
        String(process.env.JWT_SECRET_USER),
      ) as UserJwtPayload;
      return decoded.userId;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token.');
    }
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
