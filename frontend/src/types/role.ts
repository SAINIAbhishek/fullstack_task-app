export enum RolePermissionEnum {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPDATE = 'UPDATE',
}

export enum RoleNameEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export type RoleType = {
  readonly _id: string;
  readonly name: RoleNameEnum;
  readonly permissions: RolePermissionEnum[];
};
