import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class LeaderboardController {
  constructor(private service = new MatchService()) {}

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    const { code, data, message } = await this.service.findAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  }
}
