import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';
import { createMovieSchema } from '../schemas/movie';
import { appoveAMovie, insertMovie } from '../services/movie';
import { RequestExt } from '../interfaces/auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import MovieModel from '../models/movie';
import { Movie } from '../interfaces/movie.interface';

const getAllMoviesCtrl = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const searchFilter = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const totalMovies = await MovieModel.countDocuments(searchFilter);

    const totalPages = Math.ceil(totalMovies / Number(limit));
    const startIndex = (Number(page) - 1) * Number(limit);

    const movies: Movie[] = await MovieModel.find(searchFilter)
      .skip(startIndex)
      .limit(Number(limit));

    res.json({
      totalMovies,
      totalPages,
      currentPage: Number(page),
      movies,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error getting the movies' });
  }
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

const approveMovieCtrl = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const response = await appoveAMovie(id);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export { getAllMoviesCtrl, addMovieCtrl, approveMovieCtrl };
