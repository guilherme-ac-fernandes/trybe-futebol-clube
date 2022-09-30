import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();
const matchController = new MatchController();

router.get('/home', matchController.findAll.bind(matchController));

export default router;
