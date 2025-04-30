import { Functionality, PermissionGroups } from '@prisma/client';

type PermissionGroup = {
  id: number;
  description: string;
};

type EnterpriseLoginResponse = {
  id: number;
  name: string;
  email: string;
  PermissionGroups: Partial<PermissionGroups>[];
  Functionalities: Partial<Functionality>[];
  jwtToken: string;
};
