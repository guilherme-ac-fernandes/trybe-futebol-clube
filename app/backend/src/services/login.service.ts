import UserModel from '../model/UserModel';
import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/IUser';
import BcryptService from './utils/BcriptService';

export default class LoginService {
  constructor(private model = new UserModel()) {}

  public async login(user: ILogin) {
    const foundUser = await this.model.findOne(user.email);
    if (!foundUser) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    if (!BcryptService.compare(foundUser.password, user.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }
    const token = createToken(user.email);
    return { code: 200, data: token };
  }
}
