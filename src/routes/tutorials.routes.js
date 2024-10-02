import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as tutorialController from '../controllers/tutorials.controller.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, tutorialController.getAllCategories)
router.get('/tutorials/:category', authMiddleware.isAuthentified, tutorialController.getTutorialsByCategories);
