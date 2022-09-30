import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/match.service';
import { IMatch } from '../interfaces/IMatch';

export default async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body as IMatch;

  if (homeTeam === awayTeam) {
    return next({
      code: 401,
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const service = new MatchService();
  const { data: team1 } = await service.findOne(homeTeam);
  const { data: team2 } = await service.findOne(homeTeam);
  if (!team1 || !team2) {
    return next({
      code: 404,
      message: 'There is no team with such id!',
    });
  }

  next();
};
