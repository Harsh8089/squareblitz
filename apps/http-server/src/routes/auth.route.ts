import {
  authenticateToken,
  verifyRefreshToken,
} from '../middleware/token.middleware.js';
import { AuthService } from '../services/auth.service.js';
import { Router } from 'express';

const authService = new AuthService();

const router: Router = Router();

router.post('/signup', authService.signup);
router.post('/signin', authService.signIn.bind(authService));
router.post('/logout', authenticateToken, authService.logout);
router.post('/refresh', verifyRefreshToken, authService.generateAccessToken);

export default router;
