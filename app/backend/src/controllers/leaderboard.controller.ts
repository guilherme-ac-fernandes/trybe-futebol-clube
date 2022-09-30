import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    const { code, data, message } = await this.service.findAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  }
}
