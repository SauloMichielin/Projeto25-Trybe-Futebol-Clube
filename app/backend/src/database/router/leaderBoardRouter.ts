import { Router } from 'express';
import BoardController from '../controller/leaderBoardController';

const BoardRouter = Router();

BoardRouter.get('/', BoardController.getBoard);
BoardRouter.get('/home', BoardController.getHome);
BoardRouter.get('/away', BoardController.getAway);

export default BoardRouter;
