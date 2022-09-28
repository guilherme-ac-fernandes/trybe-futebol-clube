import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/IUser';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    const user = req.body as ILogin;
    const { code, data, message } = await this.service.login(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token: data });
  }
}
