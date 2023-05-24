import { Request, Response } from 'express';
import BoardService from '../service/leaderBoardService';

export default class BoardController {
  static async homeTeams(_req: Request, res: Response) {
    const response = await BoardService.homeTeams();
    return res.json(response);
  }

  static async awayTeams(_req: Request, res: Response) {
    const response = await BoardService.awayTeams();
    return res.json(response);
  }

  static async allTeams(_req: Request, res: Response) {
    const response = await BoardService.allTeams();
    return res.json(response);
  }
}
