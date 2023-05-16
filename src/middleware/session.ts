import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handler';
import { JwtPayload } from 'jsonwebtoken';
import { RequestExt } from '../interfaces/auth.interface';

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || 'null';
    const jwt = jwtByUser.split(' ').pop();
    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(401);
      res.send('Dont have a Valid JWT');
    }
    req.user = isUser;
    console.log('JWT ✅');
    next();
  } catch (e) {
    res.status(400);
    res.send('SESSION_NOT_VALID');
  }
};

export { checkJwt };
