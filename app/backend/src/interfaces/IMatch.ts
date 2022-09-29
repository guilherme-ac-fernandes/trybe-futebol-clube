export interface IMatch {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

export interface ICreateMatch extends IMatch {
  id: number,
  teamHome: { teamName: string },
  teamAway: { teamName: string }
}
