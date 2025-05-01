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
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        document: true,
        phone: true,
        active: true,
        lastLogin: true,
        addressId: true,
        enterpriseId: true,
        Address: true,
        EnterpriseUserPermissionGroups: {
          select: {
            id: true,
            permissionGroupID: true,
            enterpriseUserId: true,
            EnterpriseUsers: true,
            PermissionGroup: {
              select: {
                id: true,
                description: true,
                active: true,
                PermissionGroupsFunctionalities: {
                  select: {
                    id: true,
                    functionalityId: true,
                    Functionality: true,
                  },
                },
              },
            },
          },
          where: {
            PermissionGroup: {
              active: true,
            },
          },
        },
      },
    });
  }

  findUserById(id: number): Promise<EnterpriseUserEntity | null> {
    return this.prisma.enterpriseUsers.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        document: true,
        phone: true,
        active: true,
        lastLogin: true,
        addressId: true,
        enterpriseId: true,
        profileLogo: true,
        Address: true,
        EnterpriseUserPermissionGroups: {
          select: {
            id: true,
            permissionGroupID: true,
            enterpriseUserId: true,
            EnterpriseUsers: true,
            PermissionGroup: {
              select: {
                id: true,
                description: true,
                active: true,
                EnterpriseUserPermissionGroups: true,
                PermissionGroupsFunctionalities: {
                  select: {
                    id: true,
                    functionalityId: true,
                    Functionality: true,
                  },
                },
              },
            },
          },
          where: {
            PermissionGroup: {
              active: true,
            },
          },
        },
      },
    });
  }

  findUserByEmail(email: string): Promise<EnterpriseUserEntity | null> {
    return this.prisma.enterpriseUsers.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        document: true,
        phone: true,
        active: true,
        lastLogin: true,
        addressId: true,
        enterpriseId: true,
        Address: true,
        EnterpriseUserPermissionGroups: {
          select: {
            id: true,
            permissionGroupID: true,
            enterpriseUserId: true,
            EnterpriseUsers: true,
            PermissionGroup: {
              select: {
                id: true,
                description: true,
                active: true,
                PermissionGroupsFunctionalities: {
                  select: {
                    id: true,
                    functionalityId: true,
                    Functionality: true,
                  },
                },
              },
            },
          },
          where: {
            PermissionGroup: {
              active: true,
            },
          },
        },
      },
    });
  }

  updateUserLastLogin(id: number) {
    return this.prisma
      .$executeRaw`UPDATE "enterprise_users" SET "last_login" = NOW() WHERE id = ${id}`;
  }

  create(
    createEnterpriseUserDto: CreateEnterpriseUserDto,
    enterpriseId: number,
  ) {
    return this.prisma.enterpriseUsers.create({
      data: {
        ...createEnterpriseUserDto,
        active: true,
        enterpriseId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        active: true,
        lastLogin: true,
      },
    });
  }

  updateUser(
    id: number,
    updateEnterpriseUserDto: Partial<
      UpdateEnterpriseUserDto & { profileLogo?: Uint8Array<ArrayBufferLike> }
    >,
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
