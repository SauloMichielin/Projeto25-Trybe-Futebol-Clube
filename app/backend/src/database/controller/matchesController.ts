import { Request, Response } from 'express';
import matchesService from '../service/matchesService';

export default class matchesController {
  static async getAll(req: Request, res: Response) {
    const resultado = await matchesService.getAll();
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const progress = inProgress.toString();
      const filtros = resultado.filter((e) => e.inProgress.toString() === progress);
      return res.status(200).json(filtros);
    }
    res.status(200).json(resultado);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    await matchesService.finish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  static async up(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesService.up(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    res.status(200).json('ok');
  }

  static async add(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const resultado = await matchesService.add(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(resultado);
  }
}
