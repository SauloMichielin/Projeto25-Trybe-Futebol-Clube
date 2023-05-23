import Matches from '../models/matches';
import Teams from '../models/teams';
import MatchesInterface from '../interface/matchesInterface';
import Body from '../interface/body';

export default class MatchesService {
  static async getAll(): Promise<MatchesInterface[]> {
    const resultado = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    console.log(resultado);
    return resultado;
  }

  static async finish(id: number): Promise<MatchesInterface | undefined> {
    const partida = await Matches.findByPk(id);
    if (!partida) throw new (Error)();
    return partida.update({ inProgress: false });
  }

  static async up(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<MatchesInterface | undefined> {
    const partida = await Matches.findByPk(id);
    if (!partida) throw new (Error)();
    return partida.update({ homeTeamGoals, awayTeamGoals });
  }

  static async add(body: Body): Promise<MatchesInterface> {
    const createMatch = await Matches.create(body);
    const resultado = await Matches.findOne({ where: createMatch.dataValues.id });
    if (!resultado) throw new (Error)();
    return resultado;
  }
}
