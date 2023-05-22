import { Request, Response } from 'express';
import teamService from '../service/teamService';

export default class teamController {
  static async getAll(_req: Request, res: Response) {
    const response = await teamService.getAll();
    return res.json(response);
  }

  static async getById(_req: Request, res: Response) {
    const { id } = _req.params;
    const response = await teamService.getById(id);
    return res.json(response);
  }
}
