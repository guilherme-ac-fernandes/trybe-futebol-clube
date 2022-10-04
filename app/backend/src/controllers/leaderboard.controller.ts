import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  public async findAllHome(_req: Request, res: Response, _next: NextFunction) {
    const { code, data } = await this.service.findAllHome();
    return res.status(code).json(data);
  }

  public async findAllAway(_req: Request, res: Response, _next: NextFunction) {
    const { code, data } = await this.service.findAllAway();
    return res.status(code).json(data);
  }

  public async findAll(_req: Request, res: Response, _next: NextFunction) {
    const { code, data } = await this.service.findAll();
    return res.status(code).json(data);
  }
}
