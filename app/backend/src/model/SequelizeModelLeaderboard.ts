import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';
import { ITeamAway, ITeamHome } from '../interfaces/IBoard';

// Utilização de um class abstract com model fixo para resolução da
// model provienente da ajuda do Colega de turma Gustavo Silva
abstract class SequelizeModelLeaderboard {
  protected _model = Team;

  async findAllHome() {
    return this._model.findAll({
      include: [
        { model: MatchModel, as: 'matchHome', where: { inProgress: 0 } },
      ],
    }) as unknown as ITeamHome[];
  }

  async findAllAway() {
    return this._model.findAll({
      include: [
        { model: MatchModel, as: 'matchAway', where: { inProgress: 0 } },
      ],
    }) as unknown as ITeamAway[];
  }
}

export default SequelizeModelLeaderboard;
