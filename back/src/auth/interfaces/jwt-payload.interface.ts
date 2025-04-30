import { EnterpriseUserPermissions } from '@prisma/client';

export interface EnterpriseJwtPayload {
  userId: number;
  enterpriseId: number;
  EnterpriseUserPermissions: EnterpriseUserPermissions[];
}
