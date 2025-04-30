import { PrismaService } from 'src/prisma/prisma.service';
import { EnterpriseUserEntity } from '../entities/enterprise-user.entity';
import { Injectable } from '@nestjs/common';
import { UpdateEnterpriseUserDto } from '../dto/update-enterprise-user.dto';
import { CreateEnterpriseUserDto } from '../dto/create-enterprise-user.dto';

@Injectable()
export class EnterpriseUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllUsers(): Promise<EnterpriseUserEntity[]> {
    return this.prisma.enterpriseUsers.findMany({
      include: {
        EnterpriseUserPermissions: {
          include: {
            PermissionGroup: true,
          },
        },
      },
    });
  }

  findUserById(id: number): Promise<EnterpriseUserEntity | null> {
    return this.prisma.enterpriseUsers.findUnique({
      where: { id },
      include: {
        EnterpriseUserPermissions: {
          include: {
            PermissionGroup: true,
          },
        },
      },
    });
  }

  findUserByEmail(email: string): Promise<EnterpriseUserEntity | null> {
    return this.prisma.enterpriseUsers.findUnique({
      where: { email },
      include: {
        EnterpriseUserPermissions: {
          include: {
            PermissionGroup: true,
          },
        },
      },
    });
  }

  updateUserLastLogin(id: number) {
    return this.prisma
      .$executeRaw`UPDATE "enterprise_users" SET "last_login" = NOW() WHERE id = ${id}`;
  }

  create(createEnterpriseUserDto: CreateEnterpriseUserDto) {
    return this.prisma.enterpriseUsers.create({
      data: {
        ...createEnterpriseUserDto,
        active: true,
      },
    });
  }

  updateUser(
    id: number,
    updateEnterpriseUserDto: Partial<UpdateEnterpriseUserDto>,
  ) {
    return this.prisma.enterpriseUsers.update({
      where: { id },
      data: updateEnterpriseUserDto,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        document: true,
        active: true,
        lastLogin: true,
      },
    });
  }
}
