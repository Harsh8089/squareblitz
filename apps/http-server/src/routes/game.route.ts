import { authenticateToken } from '../middleware/token.middleware.js';
import { GameService } from '../services/game.service.js';
import { Router } from 'express';

const router: Router = Router();

const game = new GameService();

router.get('/start', authenticateToken, game.start);
router.get('/send', authenticateToken, game.sendSquare);
router.get('/stats/:id', authenticateToken, game.stats);
router.post('/verify', authenticateToken, game.verifySquare);
router.post('/end', authenticateToken, game.end);

export default router;
