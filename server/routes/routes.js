import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.route('/user/:name').get(UserController.getUser);
router.route('/user/').post(UserController.createUser);

export default router;
