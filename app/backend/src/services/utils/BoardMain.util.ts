export default class BoardHome {
  static goals(teamHome: any, teamAway: any) {
    const goalsFavor = teamHome.goalsFavor + teamAway.goalsFavor;
    const goalsOwn = teamHome.goalsOwn + teamAway.goalsOwn;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResults(teamHome: any, teamAway: any) {
    const results = {
      totalVictories: teamHome.totalVictories + teamAway.totalVictories,
      totalDraws: teamHome.totalDraws + teamAway.totalDraws,
      totalLosses: teamHome.totalLosses + teamAway.totalLosses,
      totalPoints: teamHome.totalPoints + teamAway.totalPoints,
    };
    return results;
  }

  static efficiency(teamHome: any, teamAway: any) {
    const totalPoints = teamHome.totalPoints + teamAway.totalPoints;
    const totalGames = teamHome.totalGames + teamAway.totalGames;
    return Number(((totalPoints / (totalGames * 3)) * 100)).toFixed(2);
  }

  static generateBoard(dataHome: any, dataAway: any) {
    const leaderboardArray = [] as any;
    dataHome.forEach((teamHome: any) => {
      const teamAway = dataAway.find((team: any) => team.name === teamHome.name);
      const totalGames = teamHome.totalGames + teamAway.totalGames;
      const goals = BoardHome.goals(teamHome, teamAway);
      const result = BoardHome.matchResults(teamHome, teamAway);
      const efficiency = BoardHome.efficiency(teamHome, teamAway);
      leaderboardArray.push({
        name: teamHome.name,
        totalGames,
        ...goals,
        ...result,
        efficiency,
      });
    });
    return leaderboardArray;
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
