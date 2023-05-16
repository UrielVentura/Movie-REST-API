import { InserMovie } from '../interfaces/movie.interface';
import MovieModel from '../models/movie';

const insertMovie = async (item: InserMovie) => {
  const movie = {
    name: item.name,
    addedByUser: item.user,
  };
  const insertedMovie = await MovieModel.create(movie);
  return insertedMovie;
};

const appoveAMovie = async (id: string) => {
  const movie = await MovieModel.findByIdAndUpdate(
    { _id: id },
    { approved: true },
    { new: true }
  );
  return movie;
};

export { insertMovie, appoveAMovie };
