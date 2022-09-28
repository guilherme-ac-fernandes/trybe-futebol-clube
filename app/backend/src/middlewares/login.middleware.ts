import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/IUser';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body as ILogin;

  if (!email || email.length === 0) {
    return next({ code: 400, message: 'All fields must be filled' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(email.match(emailRegex))) {
    return next({ code: 400, message: 'Incorrect email or password' });
  }

  if (!password || password.length < 7) {
    return next({ code: 400, message: 'All fields must be filled' });
  }

  next();
};
