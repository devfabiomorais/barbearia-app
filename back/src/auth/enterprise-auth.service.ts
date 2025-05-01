import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import ms from 'ms';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnterpriseJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class EnterpriseAuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async createAccessToken(userData: EnterpriseJwtPayload) {
    return sign(userData, String(process.env.JWT_SECRET), {
      expiresIn: String(process.env.JWT_EXPIRATION || '7d') as ms.StringValue,
    });
  }

  public async validateEnterpriseUser(jwtPayload: EnterpriseJwtPayload) {
    const user = await this.prisma.enterpriseUsers.findUnique({
      where: {
        id: jwtPayload?.userId,
      },
      include: {
        Enterprise: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    const userPermissions =
      await this.prisma.enterpriseUsersPermissionGroups.findMany({
        where: {
          enterpriseUserId: jwtPayload?.userId,
        },
        select: {
          permissionGroupID: true,
        },
      });

    const permissionGroupIds = userPermissions.map((p) => p.permissionGroupID);

    const functionalities = await this.prisma.functionality.findMany({
      where: {
        PermissionGroupsFunctionalities: {
          some: {
            permissionGroupId: {
              in: permissionGroupIds,
            },
            enterpriseId: user.enterpriseId,
          },
        },
      },
    });

    return {
      ...user,
      functionalities,
    };
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
        String(process.env.JWT_SECRET),
      ) as EnterpriseJwtPayload;
      console.log(decoded);
      return decoded.userId;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token Inválido.');
    }
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
