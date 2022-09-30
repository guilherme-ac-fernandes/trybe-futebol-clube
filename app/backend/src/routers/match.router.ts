import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import Middlewares from '../middlewares';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.findAll.bind(matchController));
router.post('/', Middlewares.auth, Middlewares.match, matchController.create.bind(matchController));
router.patch('/:id/finish', matchController.updateFinish.bind(matchController));
router.patch('/:id', matchController.updateMatches.bind(matchController));

export default router;
