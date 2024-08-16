import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/', authMiddleware.createAccount, authController.createAccount);
router.post('/session', authMiddleware.loginAccount, authController.loginAccount);
router.post('/finish', authMiddleware.finishAccount, authController.finishAccount);