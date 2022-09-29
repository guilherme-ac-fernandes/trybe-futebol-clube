import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.login.bind(teamController));

export default router;
