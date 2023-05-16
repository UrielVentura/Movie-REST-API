import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';

const getAllMoviesCtrl = async (req: Request, res: Response) => {
  res.send('All Users');
};

export { getAllMoviesCtrl };
