import teams from '../models/teams';
import matches from '../models/matches';
import configBoard from '../uteis/configLeaderBoard';
import BoardInterface from '../interface/leaderBoardInterface';

export default class BoardService {
  static async orderBoard(param: Array<BoardInterface>): Promise<BoardInterface[]> {
    return param.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor));
  }

  static async homeTeams(): Promise<BoardInterface[]> {
    const times = await teams.findAll();
    const partidas = await matches.findAll({ where: { inProgress: false } });
    const leaderboard = times.map((time) => configBoard(time.teamName, time.id, partidas
      .filter((partida) => partida.homeTeamId === time.id)));

    return this.orderBoard(leaderboard);
  }

  static async awayTeams(): Promise<BoardInterface[]> {
    const times = await teams.findAll();
    const partidas = await matches.findAll({ where: { inProgress: false } });
    const leaderboard = times.map((time) => configBoard(time.teamName, time.id, partidas
      .filter((partida) => partida.awayTeamId === time.id)));

    return this.orderBoard(leaderboard);
  }

  static async allTeams(): Promise<BoardInterface[]> {
    const times = await teams.findAll();
    const partidas = await matches.findAll({ where: { inProgress: false } });
    const leaderboard = times.map((time) => configBoard(time.teamName, time.id, partidas
      .filter((partida) => partida.homeTeamId === time.id || partida.awayTeamId === time.id)));

    return this.orderBoard(leaderboard);
  }
}
