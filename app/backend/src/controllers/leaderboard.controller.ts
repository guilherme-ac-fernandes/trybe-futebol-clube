import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  public async findAllHome(_req: Request, res: Response, next: NextFunction) {
    const { code, data, message } = await this.service.findAllHome();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  }

  public async findAllAway(_req: Request, res: Response, next: NextFunction) {
    const { code, data, message } = await this.service.findAllAway();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  }
}
