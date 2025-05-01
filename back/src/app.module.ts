import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { EnterpriseUsersModule } from './enterprise-users/enterprise-users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, EnterpriseUsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
