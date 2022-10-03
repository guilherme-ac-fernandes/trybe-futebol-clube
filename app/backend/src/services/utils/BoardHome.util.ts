import IBoard, { ITeamMatch, ITeamHome } from '../../interfaces/IBoard';

export default class BoardHome {
  static goals(matches: ITeamMatch[]) {
    const goalsFavor = matches
      .reduce((acc: number, curr: ITeamMatch) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = matches
      .reduce((acc: number, curr: ITeamMatch) => acc + curr.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResults(matches: ITeamMatch[]) {
    const results = { totalVictories: 0, totalDraws: 0, totalLosses: 0, totalPoints: 0 };
    matches.forEach((match: ITeamMatch) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        results.totalVictories += 1;
        results.totalPoints += 3;
        return;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        results.totalLosses += 1;
        return;
      }
      results.totalDraws += 1;
      results.totalPoints += 1;
    });
    return results;
  }

  static efficiency(totalPoints: number, totalMatches: number) {
    return Number((totalPoints / (totalMatches * 3)) * 100).toFixed(2);
  }

  static generateBoard(teamMatches: ITeamHome[]): IBoard[] {
    return teamMatches.map(({ teamName, matchHome }) => {
      const totalGames = matchHome.length;
      const goals = BoardHome.goals(matchHome);
      const result = BoardHome.matchResults(matchHome);
      const efficiency = BoardHome.efficiency(result.totalPoints, totalGames);
      return {
        name: teamName,
        totalGames,
        ...goals,
        ...result,
        efficiency,
      };
    });
  }
}
