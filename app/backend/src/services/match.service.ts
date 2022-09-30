import MatchModel from '../model/MatchModel';
import { ICreateMatch, IMatch } from '../interfaces/IMatch';

export default class MatchService {
  constructor(private model = new MatchModel()) {}

  public async findAll() {
    const matches = await this.model.findAll() as unknown as ICreateMatch[];
    if (!matches) {
      return { code: 404, message: 'Not found any matches' };
    }
    return { code: 200, data: matches };
  }

  public async findOne(id: number) {
    const match = await this.model.findByPk(id);
    if (!match) {
      return { code: 404, message: 'Match Not found' };
    }
    return { code: 200, data: match };
  }

  public async create(match: IMatch) {
    const createMatch = await this.model.create(match);
    return { code: 201, data: createMatch };
  }

  public async updateFinish(id: number) {
    await this.model.updateFinish(id);
    return { code: 200, data: { message: 'Finished' } };
  }

  public async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.updateMatches(id, homeTeamGoals, awayTeamGoals);
    return { code: 200, data: { homeTeamGoals, awayTeamGoals } };
  }
}
