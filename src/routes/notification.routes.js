import { Router } from "express";
import * as notificationController from '../controllers/notification.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, authMiddleware.isMultiuserNotificationsAllowed, notificationController.getNotificationsAndRead);
router.post('/receptor/:id', authMiddleware.isAuthentified, notificationController.createNotificationReceptor);
