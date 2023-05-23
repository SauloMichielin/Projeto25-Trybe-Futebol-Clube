import { Router } from 'express';
import matchesController from '../controller/matchesController';
import { validate } from '../uteis/token';
import matchesMiddleware from '../middlewares/matchesMiddlewares';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', validate, matchesController.finish);
matchesRouter.patch('/:id', validate, matchesController.up);
matchesRouter.post('/', validate, matchesMiddleware, matchesController.add);

export default matchesRouter;
