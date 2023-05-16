import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';
import { createMovieSchema } from '../schemas/movie';
import { insertMovie } from '../services/movie';
import { RequestExt } from '../interfaces/auth.interface';
import { JwtPayload } from 'jsonwebtoken';

const getAllMoviesCtrl = async (req: Request, res: Response) => {
  res.send('All Users');
};

const addMovieCtrl = async (req: RequestExt, res: Response) => {
  try {
    const { error, value } = createMovieSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const { name } = value;
      const jwtPayload = req.user as JwtPayload;

      const responseMovie = await insertMovie({ name, user: jwtPayload.email });
      res.send(responseMovie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export { getAllMoviesCtrl, addMovieCtrl };
