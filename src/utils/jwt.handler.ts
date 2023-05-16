import { sign, verify } from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'tokken010101';

const generateToken = (user: User) => {
  const jwt = sign({ email: user.email }, JWT_SECRET, {
    expiresIn: '2h',
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };
