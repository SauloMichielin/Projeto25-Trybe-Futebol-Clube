import matches from '../models/matches';
import teams from '../models/teams';
import MatchesInterface from '../interface/matchesInterface';
import BodyInterface from '../interface/body';

export default class MatchesService {
  static async getAll(): Promise<MatchesInterface[]> {
    const resultado = await matches.findAll({
      include: [
        { model: teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    console.log(resultado);
    return resultado;
  }

  static async finish(id: number): Promise<MatchesInterface | undefined> {
    const partida = await matches.findByPk(id);
    if (!partida) throw new (Error)();
    return partida.update({ inProgress: false });
  }

  static async up(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<MatchesInterface | undefined> {
    const partida = await matches.findByPk(id);
    if (!partida) throw new (Error)();
    return partida.update({ homeTeamGoals, awayTeamGoals });
  }

  static async add(body: BodyInterface): Promise<MatchesInterface> {
    const match = await matches.create(body);
    const resultado = await matches.findOne({ where: match.dataValues.id });
    if (!resultado) throw new (Error)();
    return resultado;
  }
}
