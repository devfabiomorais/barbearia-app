import {
  EnterpriseUsers,
  EnterpriseUserPermissions,
  PermissionGroups,
} from '@prisma/client';

type EnterpriseUserPermissionsType = EnterpriseUserPermissions & {
  PermissionGroup: PermissionGroups;
};

export class EnterpriseUserEntity implements EnterpriseUsers {
  name: string;
  id: number;
  email: string;
  password: string;
  document: string | null;
  phone: string | null;
  active: boolean;
  lastLogin: Date | null;
  profileLogo: Uint8Array<ArrayBufferLike> | null;
  addressId: number | null;
  enterpriseId: number;
  EnterpriseUserPermissions?: EnterpriseUserPermissionsType[];
}
