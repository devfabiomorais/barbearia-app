import { Module } from '@nestjs/common';
import { EnterpriseUsersService } from './enterprise-users.service';
import { EnterpriseUsersController } from './enterprise-users.controller';
import { EnterpriseUsersRepository } from './repositories/enterprise-users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnterpriseAuthService } from 'src/auth/enterprise-auth.service';

@Module({
  controllers: [EnterpriseUsersController],
  providers: [
    EnterpriseUsersRepository,
    PrismaService,
    EnterpriseUsersService,
    EnterpriseAuthService,
  ],
})
export class EnterpriseUsersModule {}
