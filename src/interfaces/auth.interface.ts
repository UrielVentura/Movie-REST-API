import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface Auth {
  email: string;
  password: string;
}

export interface RequestExt extends Request {
  user?: string | JwtPayload;
}
