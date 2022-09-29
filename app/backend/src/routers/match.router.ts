import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.findAll.bind(matchController));
router.post('/', matchController.create.bind(matchController));

export default router;
