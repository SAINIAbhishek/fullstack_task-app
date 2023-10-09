declare type User = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  name: string;
  roles: string[] | Role[];
  createdAt: string;
  updatedAt: string;
};
