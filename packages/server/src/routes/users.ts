import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import { dependencies } from '../dependencies';

const router = Router();
const usersController = new UsersController(dependencies);

router.post('/', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router;
