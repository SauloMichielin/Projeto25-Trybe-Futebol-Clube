import { Request, Response } from 'express';
import MatchesService from '../service/matchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const resultado = await MatchesService.getAll();
    if (inProgress === 'true') {
      return res.json(resultado.filter((match) => match.inProgress === true));
    }
    if (inProgress === 'false') {
      return res.json(resultado.filter((match) => match.inProgress === false));
    }
    console.log(resultado);
    return res.json(resultado);
  }

  static async finish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await MatchesService.finish(+id);
    return res.status(200).json({ message: 'Finished' });
  }

  static async up(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.up(+id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Successfully Updated' });
  }

  static async add(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const resultado = await MatchesService.add(body);
    return res.status(201).json(resultado);
  }
}
