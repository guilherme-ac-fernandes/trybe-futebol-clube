import { IMatch, ICreateMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import TeamModel from '../database/models/Team';

// interface IIncludes {
//   model: Model,
//   as: string,
// }

// Utilização de um class abstract com model fixo para resolução da
// model provienente da ajuda do Colega de turma Gustavo Silva
abstract class SequelizeModelMatch {
  protected _model = Match;

  async findAll(): Promise<Match[] | null> {
    return this._model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome' },
        { model: TeamModel, as: 'teamAway' },
      ],
    });
  }

  async create(match: IMatch): Promise<ICreateMatch> {
    return this._model.create(match);
  }
}

export default SequelizeModelMatch;
