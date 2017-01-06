import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.route('/user/:name').get(UserController.getUser);
router.route('/register/').post(UserController.createUser);
router.route('/login/').post(UserController.checkUser);

export default router;
