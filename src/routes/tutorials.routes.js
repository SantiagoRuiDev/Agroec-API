import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as tutorialController from '../controllers/tutorials.controller.js'
export const router = Router();

//Falta Middleware
router.post('/send-push/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.sendTutorialPushNotification)
router.post('/:category', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.createTutorial)
router.delete('/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.deleteTutorial)
router.put('/set-visibility/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.setVisibility)
router.get('/:category', authMiddleware.isAuthentified, tutorialController.getTutorialsByCategories);