import { Router } from 'express';
import loginController from '../controller/loginController';
import { validate } from '../uteis/token';

const loginRouter = Router();

loginRouter.post('/', loginController.login);
loginRouter.get('/role', validate, loginController.getByRole);

export default loginRouter;
