import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user';
import { encrypt, verified } from '../utils/bcrypt.handler';
import { generateToken } from '../utils/jwt.handler';

const registerNewUser = async ({ email, password, name }: User) => {
  const user = await UserModel.findOne({ email });
  if (user) return 'ALREADY_USER';
  const passHas = await encrypt(password);

  const registerNewUser = await UserModel.create({
    email,
    password: passHas,
    name,
  });

  return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
  const user: User | null = await UserModel.findOne({ email });
  if (!user) return 'NOT_FOUND_USER';

  const passwordHash = user.password; //Password Encrited
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return 'PASSWORD_INCORRECT';
  const token = generateToken(user.email);
  const data = {
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  };

  return data;
};

export { registerNewUser, loginUser };
