import { Request, Response } from 'express';
import BoardService from '../service/leaderBoardService';

export default class BoardController {
  static async getHome(_req: Request, res: Response) {
    const leaderBoard = await BoardService.LeaderBoard('home');
    return res.status(200).json(leaderBoard);
  }

  static async getAway(_req: Request, res: Response) {
    const leaderBoard = await BoardService.LeaderBoard('away');
    return res.status(200).json(leaderBoard);
  }

  static async getBoard(_req: Request, res: Response) {
    const leaderBoard = await BoardService.LeaderBoard('');
    return res.status(200).json(leaderBoard);
  }
}
