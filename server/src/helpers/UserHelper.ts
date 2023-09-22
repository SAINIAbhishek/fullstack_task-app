import User, { UserModel } from '../models/UserModel';

const fullName = (firstname?: string, lastname?: string) => {
  return `${firstname || ''}${lastname ? ' ' + lastname : ''}`;
};

const findByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({ email: email }).lean().exec();
};

export default { findByEmail, fullName };
