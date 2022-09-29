import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.findAll.bind(teamController));
router.get('/:id', teamController.findByPk.bind(teamController));

export default router;
