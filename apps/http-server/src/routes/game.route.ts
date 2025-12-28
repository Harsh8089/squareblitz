import { authenticateToken } from '../middleware/token.middleware.js';
import { GameService } from '../services/game.service.js';
import { Router } from 'express';

const router: Router = Router();

const game = new GameService();

router.get('/start', authenticateToken, game.start);
router.get('/send', authenticateToken, game.sendSquare);
router.get('/score', authenticateToken, game.score);
router.post('/verify', authenticateToken, game.verifySquare);

export default router;
