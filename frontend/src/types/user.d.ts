declare type User = {
  readonly _id: string;
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly name: string;
  readonly roles: string[] | Role[];
  readonly createdAt: string;
  readonly updatedAt: string;
};
