export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ICreateMatch extends IMatch {
  id: number,
}

export interface IMatchIncludes extends ICreateMatch {
  teamHome: { teamName: string },
  teamAway: { teamName: string },
}
