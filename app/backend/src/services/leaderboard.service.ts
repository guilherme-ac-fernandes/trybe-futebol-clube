import LeaderboardModel from '../model/LeaderboardModel';
import BoardHome from './utils/BoardHome.util';
import BoardAway from './utils/BoardAway.util';
import BoardMain from './utils/BoardMain.util';

export default class LeaderboardService {
  constructor(private model = new LeaderboardModel()) {}

  public async findAllHome() {
    const teamMatches = await this.model.findAllHome();
    if (!teamMatches) {
      return { code: 404, message: 'Not Found' };
    }
    const boardMatches = teamMatches.map(BoardHome.generateBoard);
    const sortBoard = BoardHome.sortBoard(boardMatches);
    return { code: 200, data: sortBoard };
  }

  public async findAllAway() {
    const teamMatches = await this.model.findAllAway();
    if (!teamMatches) {
      return { code: 404, message: 'Not Found' };
    }
    const boardMatches = teamMatches.map(BoardAway.generateBoard);
    const sortBoard = BoardAway.sortBoard(boardMatches);
    return { code: 200, data: sortBoard };
  }

  public async findAll() {
    const { data: dataHome } = await this.findAllHome();
    const { data: dataAway } = await this.findAllAway();
    if (!dataHome || !dataAway) {
      return { code: 404, message: 'Not Found' };
    }
    const leaderboard = BoardMain.generateBoard(dataHome, dataAway);
    const sortBoard = BoardMain.sortBoard(leaderboard);
    return { code: 200, data: sortBoard };
  }
}
