import { authenticateToken } from '../middleware/token.middleware.js';
import { GameService } from '../services/game.service.js';
import { Router } from 'express';

const router: Router = Router();

const gameService = GameService.getInstance();

router.get('/start', authenticateToken, gameService.start);
router.get('/send', authenticateToken, gameService.send);
router.get('/stats/:id', authenticateToken, gameService.stats);
router.post('/verify', authenticateToken, gameService.verify);
router.post('/end', authenticateToken, gameService.end);

export default router;
