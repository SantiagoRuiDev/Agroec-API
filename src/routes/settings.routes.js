import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as settingsController from '../controllers/settings.controller.js'

export const router = Router();

router.put('/', authMiddleware.isAuthentified, settingsController.updateSettings)
router.get('/', authMiddleware.isAuthentified, settingsController.getSettings)
router.get('/sidebar', authMiddleware.isAuthentified, settingsController.getSidebarSettings)

// ENDPOINT LISTAR SUGERENCIAS