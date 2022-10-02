import IBoard from '../../interfaces/IBoard';

export default class BoardHome {
  static goals(teamHome: IBoard, teamAway: IBoard) {
    const goalsFavor = teamHome.goalsFavor + teamAway.goalsFavor;
    const goalsOwn = teamHome.goalsOwn + teamAway.goalsOwn;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResults(teamHome: IBoard, teamAway: IBoard) {
    const results = {
      totalVictories: teamHome.totalVictories + teamAway.totalVictories,
      totalDraws: teamHome.totalDraws + teamAway.totalDraws,
      totalLosses: teamHome.totalLosses + teamAway.totalLosses,
      totalPoints: teamHome.totalPoints + teamAway.totalPoints,
    };
    return results;
  }

  static efficiency(teamHome: IBoard, teamAway: IBoard) {
    const totalPoints = teamHome.totalPoints + teamAway.totalPoints;
    const totalGames = teamHome.totalGames + teamAway.totalGames;
    return Number(((totalPoints / (totalGames * 3)) * 100)).toFixed(2);
  }

  static generateBoard(dataHome: IBoard[], dataAway: IBoard[]) {
    const leaderboardArray = [] as unknown as IBoard[];
    dataHome.forEach((teamHome: IBoard, index: number) => {
      const teamAway = dataAway[index];
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
    return leaderboardArray as IBoard[];
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
