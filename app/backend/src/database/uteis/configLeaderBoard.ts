import BoardInterface from '../interface/leaderBoardInterface';
import matches from '../models/matches';

let typeData: BoardInterface = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const init = () => {
  typeData = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };
};

const teamName = (name: string) => {
  typeData.name = name;
};

const totalPoints = (
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  if (homeTeamGoals > awayTeamGoals) {
    typeData.totalPoints += 3;
    typeData.totalVictories += 1;
  } else if (homeTeamGoals === awayTeamGoals) {
    typeData.totalPoints += 1;
    typeData.totalDraws += 1;
  } else {
    typeData.totalLosses += 1;
  }

  typeData.goalsFavor += homeTeamGoals;
  typeData.goalsOwn += awayTeamGoals;
};

const totalGoals = () => {
  typeData.goalsBalance = (typeData.goalsFavor - typeData.goalsOwn);
};

const efficiency = () => {
  typeData.efficiency = +(
    ((typeData.totalPoints / (typeData.totalGames * 3)) * 100)
  ).toFixed(2);
};

const games = (game: matches[]) => {
  typeData.totalGames = game.length;
};

const configBoard = (
  name: string,
  id: number,
  game: matches[],
) : BoardInterface => {
  if (name !== typeData.name) { init(); }

  teamName(name);
  games(game);

  game.forEach((match) => {
    if (match.homeTeamId === id) {
      totalPoints(match.homeTeamGoals, match.awayTeamGoals);
    } else if (match.awayTeamId === id) {
      totalPoints(match.awayTeamGoals, match.homeTeamGoals);
    }
  });

  efficiency();
  totalGoals();

  return typeData;
};

export default configBoard;
