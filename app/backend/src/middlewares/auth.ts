import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ICreateUser } from '../interfaces/IUser';
import LoginService from '../services/login.service';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

interface IToken {
  email: string,
}

interface NewRequest extends Request {
  userRole?: string,
}

export default async (req: NewRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const validateToken: IToken = verify(token, JWT_SECRET) as IToken;
    const service = new LoginService();
    const { role } = await service.getByEmail(validateToken.email) as ICreateUser;
    if (!role) return next({ code: 401, message: 'Token must be a valid token' });
    req.userRole = role;
    next();
  } catch (err) {
    next({ code: 401, message: 'Token must be a valid token' });
  }
};
