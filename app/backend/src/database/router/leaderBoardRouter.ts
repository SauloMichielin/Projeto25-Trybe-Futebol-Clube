import { Router } from 'express';
import BoardController from '../controller/leaderBoardController';

const BoardRouter = Router();

BoardRouter.get('/home', BoardController.homeTeams);
BoardRouter.get('/away', BoardController.awayTeams);
BoardRouter.get('/', BoardController.allTeams);

export default BoardRouter;
