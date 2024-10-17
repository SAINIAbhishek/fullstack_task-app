import { RoleType } from './role';

export type UserType = {
  readonly _id: string;
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly name: string;
  readonly roles: string[] | RoleType[];
  readonly createdAt: string;
  readonly updatedAt: string;
};
