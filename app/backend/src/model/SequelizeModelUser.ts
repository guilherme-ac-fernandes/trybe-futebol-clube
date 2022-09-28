import { ICreateUser } from '../interfaces/IUser';
import User from '../database/models/User';

abstract class SequelizeModelUser {
  protected _model = User;

  async findOne(email: string): Promise<ICreateUser | null> {
    return this._model.findOne({ where: { email } });
  }
}

export default SequelizeModelUser;
