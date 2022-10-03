import LeaderboardModel from '../model/LeaderboardModel';
import BoardHome from './utils/BoardHome.util';
import BoardAway from './utils/BoardAway.util';
import BoardMain from './utils/BoardMain.util';
import IBoard, { ITeamAway, ITeamHome } from '../interfaces/IBoard';

export default class LeaderboardService {
  constructor(private model = new LeaderboardModel()) {}

  public async findAllHome() {
    const teamMatches = await this.model.findAllHome() as unknown as ITeamHome[];
    if (!teamMatches) {
      return { code: 404, message: 'Not Found' };
    }
    const boardMatches = BoardHome.generateBoard(teamMatches);
    const sortBoard = LeaderboardService.sortBoard(boardMatches);
    return { code: 200, data: sortBoard };
  }

  public async findAllAway() {
    const teamMatches = await this.model.findAllAway() as unknown as ITeamAway[];
    if (!teamMatches) {
      return { code: 404, message: 'Not Found' };
    }
    const boardMatches = BoardAway.generateBoard(teamMatches);
    const sortBoard = LeaderboardService.sortBoard(boardMatches);
    return { code: 200, data: sortBoard };
  }

  public async findAll() {
    const { data: dataHome } = await this.findAllHome();
    const { data: dataAway } = await this.findAllAway();
    if (!dataHome || !dataAway) {
      return { code: 404, message: 'Not Found' };
    }
    dataHome.sort(LeaderboardService.sortTeamName);
    dataAway.sort(LeaderboardService.sortTeamName);
    const leaderboard = BoardMain.generateBoard(dataHome, dataAway);
    const sortBoard = LeaderboardService.sortBoard(leaderboard);
    return { code: 200, data: sortBoard };
  }

  static sortTeamName(a: IBoard, b: IBoard) {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
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
