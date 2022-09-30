import LeaderboardModel from '../model/LeaderboardModel';
import BoardHome from './utils/BoardHome.util';
import BoardAway from './utils/BoardAway.util';

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
}
