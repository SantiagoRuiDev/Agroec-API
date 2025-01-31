import { Router } from "express";
import * as notificationController from '../controllers/notification.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, notificationController.getNotificationsAndRead);
router.put('/:id', authMiddleware.isAuthentified, notificationController.setUserOneSignalSubscription);
router.put('/mobile/:id', authMiddleware.isAuthentified, notificationController.setUserOneSignalMobileSuscription);
