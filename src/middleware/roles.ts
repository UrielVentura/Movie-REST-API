import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/auth.interface';
import UserModel from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.handler';

const RoleMiddelware = (requiredRole: string) => {
  return async (req: RequestExt, res: Response, next: NextFunction) => {
    const jwtByUser = req.headers.authorization || 'null';
    const jwt = jwtByUser.split(' ').pop();
    const isUser = verifyToken(`${jwt}`);

    if (typeof isUser === 'object' && isUser !== null && 'email' in isUser) {
      const jwtPayload = isUser as JwtPayload; // Casting a JwtPayload
      const User = await UserModel.findOne({ email: jwtPayload.email });
      if (User?.role !== requiredRole) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }
    next();
  };
};

export { RoleMiddelware };
