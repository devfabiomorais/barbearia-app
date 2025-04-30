import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnterpriseAuthService } from './enterprise-auth.service';
import { EnterpriseJwtStrategy } from './strategies/enterprise.jwt.strategy';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './strategies/user.jwt.strategy';

@Module({
  providers: [
    EnterpriseAuthService,
    EnterpriseJwtStrategy,
    UserAuthService,
    UserJwtStrategy,
    PrismaService,
  ],
  exports: [EnterpriseAuthService, UserAuthService],
})
export class AuthModule {}
