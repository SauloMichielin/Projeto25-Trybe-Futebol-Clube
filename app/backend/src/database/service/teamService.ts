import teams from '../models/teams';

export default class teamService {
  static async getAll() {
    const response = await teams.findAll();
    return response;
  }

  static async getById(id: string) {
    const response = await teams.findByPk(id);
    return response;
  }
}