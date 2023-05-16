import { Router } from 'express';
import { getAllMoviesCtrl } from '../controllers/movies';

const router = Router();

router.get('/', getAllMoviesCtrl);

export { router };
