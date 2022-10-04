import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    const { code, data, message } = await this.service.findAll();
    if (message) return next({ code, message });
    if (inProgress === 'true' || inProgress === 'false') {
      const matchesFilter = data?.filter((match) => `${match.inProgress}` === inProgress);
      return res.status(code).json(matchesFilter);
    }
    return res.status(code).json(data);
  }

  public async create(req: Request, res: Response, _next: NextFunction) {
    const { code, data } = await this.service.create({ ...req.body, inProgress: true });
    return res.status(code).json(data);
  }

  public async updateFinish(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { code, data, message } = await this.service.updateFinish(Number(id));
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }

  public async updateMatches(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { code, data, message } = await this.service.updateMatches(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    if (message) return next({ code, message });
    return res.status(code).json(data);
  }
}
