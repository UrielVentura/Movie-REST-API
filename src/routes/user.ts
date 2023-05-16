import { Router } from 'express';
import { getAllUsersCtrl, getUserCtrl } from '../controllers/user';
import { RoleMiddelware } from '../middleware/roles';
import { checkJwt } from '../middleware/session';

const router = Router();

router.get('/', checkJwt, RoleMiddelware('admin'), getAllUsersCtrl);
router.get('/:id', checkJwt, RoleMiddelware('admin'), getUserCtrl);

export { router };
