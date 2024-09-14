import { Router } from "express";
import * as chatController from '../controllers/chat.controller.js'

export const router = Router();

router.get('/:id', chatController.getConditionsByChat)
