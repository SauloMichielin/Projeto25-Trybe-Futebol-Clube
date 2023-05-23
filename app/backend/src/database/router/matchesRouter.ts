import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import { validate } from '../uteis/token';
import matchesMiddleware from '../middlewares/matchesMiddlewares';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.patch('/:id/finish', validate, MatchesController.finish);
matchesRouter.patch('/:id', validate, MatchesController.up);
matchesRouter.post('/', validate, matchesMiddleware, MatchesController.add);

export default matchesRouter;
