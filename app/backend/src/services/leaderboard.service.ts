import MatchModel from '../model/MatchModel';
import { IMatchIncludes } from '../interfaces/IMatch';

const TEMPLATE = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
}

export default class LeaderboardService {
  constructor(private model = new MatchModel()) {}

  public async findAll() {
    const matches = await this.model.findAll() as unknown as IMatchIncludes[];
    if (!matches) {
      return { code: 404, message: 'Not found any matches' };
    }
    matches.reduce((acc, curr) => {
      console.log(curr);

      return acc;
    }, []);
    return { code: 200, data: matches };
  }
}
