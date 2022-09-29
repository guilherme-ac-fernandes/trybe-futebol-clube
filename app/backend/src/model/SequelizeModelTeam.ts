import { ICreateTeam } from '../interfaces/ITeam';
import Team from '../database/models/Team';

// Utilização de um class abstract com model fixo para resolução da
// model provienente da ajuda do Colega de turma Gustavo Silva
abstract class SequelizeModelTeam {
  protected _model = Team;

  async findAll(): Promise<ICreateTeam[] | null> {
    return this._model.findAll();
  }
}

export default SequelizeModelTeam;
