export default class SupLeaderBoard {
  private name: string;
  private declare totalPoints: number;
  private declare totalGames: number;
  private declare totalVictories: number;
  private declare totalDraws: number;
  private declare totalLosses: number;
  private declare goalsFavor: number;
  private declare goalsOwn: number;
  private declare goalsBalance: number;
  private declare efficiency: number;

  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  private leaderBoard() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: Number(this.efficiency).toFixed(2),
    };
  }

  private setGameStats(homeTeam: number, awayTeam: number) {
    this.goalsFavor += homeTeam;
    this.goalsOwn += awayTeam;
    if (homeTeam > awayTeam) {
      this.totalPoints += 3; this.totalVictories += 1;
    }
    if (homeTeam === awayTeam) {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }
    if (homeTeam < awayTeam) { this.totalLosses += 1; }
  }

  private setEfficiency() {
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100);
  }

  private setGoalBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public getLeaderBoard(id: number, matches: any) {
    this.totalGames = matches.length;
    matches.forEach((e: any) => {
      if (e.homeTeamId === id) this.setGameStats(e.homeTeamGoals, e.awayTeamGoals);
      else this.setGameStats(e.awayTeamGoals, e.homeTeamGoals);
    });
    this.setEfficiency();
    this.setGoalBalance();
    return this.leaderBoard();
  }
}
const supLeaderBoard = (teams: any, matches: any, param: string) => {
  const result = teams.map((team: any) => {
    const newTeam = new SupLeaderBoard(team.teamName);
    if (param === 'home') {
      return newTeam.getLeaderBoard(team.id, matches.filter((e: any) => e.homeTeamId === team.id));
    }
    if (param === 'away') {
      return newTeam.getLeaderBoard(team.id, matches.filter((e: any) => e.awayTeamId === team.id));
    }
    return newTeam.getLeaderBoard(team.id, matches.filter((e: any) => e.homeTeamId === team.id
    || e.awayTeamId === team.id));
  });
  return result;
};

export { supLeaderBoard };
