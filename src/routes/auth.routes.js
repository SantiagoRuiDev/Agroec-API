import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/', authMiddleware.createAccount, authController.createAccount);
router.post('/reset-password', authController.resetPassword);
router.put('/', authMiddleware.isAuthentified, authMiddleware.updateAccount, authController.updateAccount);
router.post('/session/seller', authMiddleware.loginAccount, authController.loginSellerAccount);
router.post('/session', authMiddleware.loginAccount, authController.loginAccount);
router.get('/check', authMiddleware.isAuthentified, authController.isAuthentified);
router.post('/finish', authMiddleware.finishAccount, authController.finishAccount);
router.post('/logout', authMiddleware.isAuthentified, authController.logoutAccount);