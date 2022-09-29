import MatchModel from '../model/MatchModel';
import { ICreateMatch } from '../interfaces/IMatch';

export default class MatchService {
  constructor(private model = new MatchModel()) {}

  public async findAll() {
    const matches = await this.model.findAll() as unknown as ICreateMatch[];
    if (!matches) {
      return { code: 404, message: 'Not found any matches' };
    }
    return { code: 200, data: matches };
  }
}
