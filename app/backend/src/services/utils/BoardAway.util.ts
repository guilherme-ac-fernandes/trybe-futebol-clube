import IBoard, { ITeamMatch, ITeamAway } from '../../interfaces/IBoard';

export default class BoardHome {
  static goals(matches: ITeamMatch[]) {
    const goalsFavor = matches
      .reduce((acc: number, curr: ITeamMatch) => acc + curr.awayTeamGoals, 0);
    const goalsOwn = matches
      .reduce((acc: number, curr: ITeamMatch) => acc + curr.homeTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResults(matches: ITeamMatch[]) {
    const results = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalPoints: 0,
    };
    matches.forEach((match: ITeamMatch) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        results.totalVictories += 1;
        results.totalPoints += 3;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        results.totalLosses += 1;
      } else {
        results.totalDraws += 1;
        results.totalPoints += 1;
      }
    });
    return results;
  }

  static efficiency(totalPoints: number, totalMatches: number) {
    return Number((totalPoints / (totalMatches * 3)) * 100).toFixed(2);
  }

  static generateBoard(teamMatches: ITeamAway[]): IBoard[] {
    return teamMatches.map(({ teamName, matchAway }) => {
      const totalGames = matchAway.length;
      const goals = BoardHome.goals(matchAway);
      const result = BoardHome.matchResults(matchAway);
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

  static sortBoard(board: IBoard[]) {
    return board.sort((a: IBoard, b: IBoard) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });
  }
}
