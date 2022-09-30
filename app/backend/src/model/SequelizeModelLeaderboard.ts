import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';

// Utilização de um class abstract com model fixo para resolução da
// model provienente da ajuda do Colega de turma Gustavo Silva
abstract class SequelizeModelLeaderboard {
  protected _model = Team;

  async findAll() {
    return this._model.findAll({
      include: [
        { model: MatchModel, as: 'matchHome', where: { inProgress: 0 } },
      ],
    });
  }
}

export default SequelizeModelLeaderboard;
