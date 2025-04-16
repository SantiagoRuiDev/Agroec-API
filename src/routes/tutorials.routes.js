import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as tutorialController from '../controllers/tutorials.controller.js'
export const router = Router();

//Falta Middleware
router.post('/send-push/:id', authMiddleware.isAuthentified, tutorialController.sendTutorialPushNotification)
router.post('/:category', authMiddleware.isAuthentified, tutorialController.createTutorial)
router.delete('/:id', authMiddleware.isAuthentified, tutorialController.deleteTutorial)
router.put('/set-visibility/:id', authMiddleware.isAuthentified, tutorialController.setVisibility)
router.get('/:category', authMiddleware.isAuthentified, tutorialController.getTutorialsByCategories);