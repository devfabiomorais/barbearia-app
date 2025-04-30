import {
  EnterpriseUsers,
  EnterpriseUsersPermissionGroups,
  PermissionGroups,
  Address,
  PermissionGroupFunctionality,
  Functionality,
} from '@prisma/client';

type EnterpriseUserPermissionsType = EnterpriseUsersPermissionGroups & {
  PermissionGroup: PermissionGroups & {
    PermissionGroupFunctionality: Partial<PermissionGroupFunctionality> &
      {
        Functionality: Functionality;
      }[];
  };
};

export class EnterpriseUserEntity
  implements Omit<EnterpriseUsers, 'profileLogo'>
{
  name: string;
  id: number;
  email: string;
  password: string;
  document: string | null;
  phone: string | null;
  active: boolean;
  lastLogin: Date | null;
  profileLogo?: Uint8Array<ArrayBufferLike> | string | null;
  addressId: number | null;
  enterpriseId: number;
  EnterpriseUserPermissions?: EnterpriseUserPermissionsType[];
  Address?: Address | null;
}

export class ResponseEnterpriseUserEntity
  implements Omit<EnterpriseUsers, 'profileLogo' | 'password' | 'enterpriseId'>
{
  name: string;
  id: number;
  email: string;
  password?: string | null;
  document: string | null;
  phone: string | null;
  active: boolean;
  lastLogin: Date | null;
  profileLogo?: string | null;
  addressId: number | null;
  enterpriseId?: number | null;
  Address?: Address | null;
  PermissionGroups: Partial<PermissionGroups>[];
  Functionalities: Partial<Functionality>[];
}
