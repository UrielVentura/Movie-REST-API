import { hash, compare } from 'bcryptjs';

const encrypt = async (password: string) => {
  const passworkdHass = await hash(password, 8);
  return passworkdHass;
};

const verified = async (password: string, passHash: string) => {
  const isCorrect = await compare(password, passHash);
  return isCorrect;
};

export { encrypt, verified };
