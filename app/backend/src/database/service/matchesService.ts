import matches from '../models/matches';
import teams from '../models/teams';
import MatchesInterface from '../interface/matchesInterface';

export default class MatchesService {
  static async getAll(): Promise<MatchesInterface[]> {
    const resultado = await matches.findAll({
      include: [
        { model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    // console.log(resultado);
    return resultado;
  }

  static async finish(id: number): Promise<void> {
    await matches.update({ inProgress: false }, { where: { id } });
  }

  static async up(id: number, homeGoals: number, awayGoals: number): Promise<void> {
    await matches.update({ homeTeamGoals: homeGoals, awayTeamGoals: awayGoals }, { where: { id } });
  }

  static async add(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await matches.create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return match;
  }
}
