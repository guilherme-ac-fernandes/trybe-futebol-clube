export default class BoardHome {
  static goals(matches: any) {
    const goalsFavor = matches
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = matches
      .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResults(matches: any) {
    const results = { totalVictories: 0, totalDraws: 0, totalLosses: 0, totalPoints: 0 };
    matches.forEach((match: any) => {
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

  static generateBoard({ teamName, matchHome }: any) {
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
  }

  static sortBoard(board: any) {
    return board.sort((a: any, b: any) => {
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
