import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './repositories/users.repository';
import { UserAuthService } from 'src/auth/user-auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, UserAuthService],
})
export class UsersModule {}
