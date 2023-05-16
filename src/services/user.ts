import UserModel from '../models/user';

const getAllUsers = async () => {
  const rspUser = await UserModel.find({});
  return rspUser;
};

const getAUser = async (id: string) => {
  const response = await UserModel.findById({ _id: id });
  console.log('response', response);
  return response;
};

export { getAllUsers, getAUser };
