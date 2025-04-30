import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
=======
import { EnterpriseUsersModule } from './enterprise-users/enterprise-users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnterpriseUsersModule, AuthModule],
>>>>>>> e9dcb178e33cf931d79f2945de0b267973bde498
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
