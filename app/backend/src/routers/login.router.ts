import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Middlewares from '../middlewares';

const router = Router();
const loginController = new LoginController();

router.post('/', Middlewares.login, loginController.login.bind(loginController));
router.get('/validate', Middlewares.auth, loginController.validate.bind(loginController))
export default router;
