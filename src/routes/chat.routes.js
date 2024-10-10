import { Router } from "express";
import * as chatController from '../controllers/chat.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/:id', authMiddleware.isAuthentified, chatController.getConditionsByChat)
