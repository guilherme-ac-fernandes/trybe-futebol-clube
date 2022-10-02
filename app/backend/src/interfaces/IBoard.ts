export interface ITeamMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeamHome {
  id: number,
  teamName: string,
  matchHome: ITeamMatch[],
}

export interface ITeamAway {
  id: number,
  teamName: string,
  matchAway: ITeamMatch[],
}

export default interface IBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
  matchAway?: ITeamMatch[],
  matchHome?: ITeamMatch[],
}
