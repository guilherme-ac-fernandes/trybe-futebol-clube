import { NextFunction, Request, Response } from 'express';
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
      const matchesFilter = data?.filter((match) => match.inProgress === Boolean(inProgress));
      return { code: 200, data: matchesFilter };
    }
    return res.status(code).json(data);
  }

  public async create(req: Request, res: Response, _next: NextFunction) {
    const { code, data } = await this.service.create({ ...req.body, inProgress: true });
    // if (message) {
    //   return next({ code, message });
    // }
    return res.status(code).json(data);
  }

  public async updateFinish(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const { code, data } = await this.service.updateFinish(Number(id));
    return res.status(code).json(data);
  }
}
