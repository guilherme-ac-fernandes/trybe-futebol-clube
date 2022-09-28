import { ICreateUser } from '../interfaces/IUser';
import User from '../database/models/User';

// Utilização de um class abstract com model fixo para resolução da
// model provienente da ajuda do Colega de turma Gustavo Silva
abstract class SequelizeModelUser {
  protected _model = User;

  async findOne(email: string): Promise<ICreateUser | null> {
    return this._model.findOne({ where: { email } });
  }
}

export default SequelizeModelUser;
