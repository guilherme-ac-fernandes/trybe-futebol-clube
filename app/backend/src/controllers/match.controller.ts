import { NextFunction, Request, Response } from 'express';
import { ICreateMatch } from '../interfaces/IMatch';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    const { code, data, message } = await this.service.findAll();
    if (message) {
      return next({ code, message });
    }
    if (inProgress === 'true' || inProgress === 'false') {
      const matchesFilter = await this.service.findAll().filter((match) => match.inProgress === Boolean(inProgress));
      return { code: 200, data: matchesFilter };
    }
    return res.status(code).json(data);
  }
}
