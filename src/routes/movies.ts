import { Router } from 'express';
import {
  addMovieCtrl,
  approveMovieCtrl,
  getAllMoviesCtrl,
} from '../controllers/movies';
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

router.patch(
  '/approvedmovie/:id',
  checkJwt,
  RoleMiddelware(['admin']),
  approveMovieCtrl
);

export { router };
