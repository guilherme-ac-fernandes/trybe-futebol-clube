import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private service = new TeamService()) {}

  public async login(_req: Request, res: Response, next: NextFunction) {
    const { code, data, message } = await this.service.findAll();
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json(data);
  }
}
