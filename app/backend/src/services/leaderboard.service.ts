import LeaderboardModel from '../model/LeaderboardModel';
import BoardHome from './utils/BoardHome.util';

export default class LeaderboardService {
  constructor(private model = new LeaderboardModel()) {}

  public async findAll() {
    const teamMatches = await this.model.findAll();
    if (!teamMatches) {
      return { code: 404, message: 'Not Found' };
    }
    const boardMatches = teamMatches.map(BoardHome.generateBoard);
    const sortBoard = boardMatches.sort(BoardHome.sortBoard);
    return { code: 200, data: sortBoard };
  }
}
