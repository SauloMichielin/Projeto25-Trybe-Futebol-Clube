import teams from '../models/teams';
import teamInterface from '../interface/teamInterface';

export default class teamService {
  static async getAll(): Promise<teamInterface[]> {
    const response = await teams.findAll();
    return response;
  }

  static async getById(id: string): Promise<teamInterface | null> {
    const response = await teams.findByPk(id);
    return response;
  }
}
