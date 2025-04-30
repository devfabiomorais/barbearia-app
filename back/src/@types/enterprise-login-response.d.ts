type PermissionGroup = {
  id: number;
  description: string;
};

type EnterpriseLoginResponse = {
  id: number;
  name: string;
  email: string;
  permissionGroups: PermissionGroup[];
  jwtToken: string;
};
