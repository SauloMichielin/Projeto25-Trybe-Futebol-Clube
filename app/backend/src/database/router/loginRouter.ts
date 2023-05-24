import { Router } from 'express';
import loginController from '../controller/loginController';
import { validate } from '../uteis/token';
import VerificaLogin from '../middlewares/loginMiddleware';

const loginRouter = Router();

loginRouter.post('/', VerificaLogin, loginController.login);
loginRouter.get('/role', validate, loginController.getByRole);

export default loginRouter;
