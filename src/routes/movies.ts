import { Router } from 'express';
import { addMovieCtrl, getAllMoviesCtrl } from '../controllers/movies';
import { checkJwt } from '../middleware/session';
import { RoleMiddelware } from '../middleware/roles';

const router = Router();

router.get('/', getAllMoviesCtrl); //TODO

router.post(
  '/addmovie',
  checkJwt,
  RoleMiddelware(['admin', 'user']),
  addMovieCtrl
);

export { router };
