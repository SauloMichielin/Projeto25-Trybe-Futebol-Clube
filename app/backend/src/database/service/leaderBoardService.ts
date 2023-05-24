import teamService from './teamService';
import { supLeaderBoard } from '../uteis/configLeaderBoard';
import MatchesService from './matchesService';

export default class LeaderBoardService {
  static async LeaderBoard(param: string) {
    const team = await teamService.getAll();
    const partidas = await MatchesService.getAll();
    const finalizadas = partidas.filter((e) => e.inProgress.toString() === 'false');
    const leaderBoard = supLeaderBoard(team, finalizadas, param);

    const leaderBoardOrderly = leaderBoard.sort((a: any, b: any) => b.goalsFavor - a.goalsFavor)
      .sort((a: any, b: any) => b.goalsBalance - a.goalsBalance)
      .sort((a: any, b: any) => b.totalPoints - a.totalPoints);
    return leaderBoardOrderly;
  }
}
