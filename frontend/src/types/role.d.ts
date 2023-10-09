declare enum RolePermissionEnum {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPDATE = 'UPDATE',
}

declare enum RoleNameEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

declare type Role = {
  readonly _id: string;
  readonly name: RoleNameEnum;
  readonly permissions: RolePermissionEnum[];
};
