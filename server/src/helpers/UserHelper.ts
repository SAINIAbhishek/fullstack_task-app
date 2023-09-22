import User, { UserModel } from '../models/UserModel';

const findByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({ email: email }).lean().exec();
};

export default { findByEmail };
