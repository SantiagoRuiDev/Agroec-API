import { Router } from "express";
import * as inputController from '../controllers/input.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();


router.post('/', authMiddleware.isAuthentified, inputController.createInput)
router.put('/:input_id', authMiddleware.isAuthentified, inputController.updateInput)
router.delete('/:input_id', authMiddleware.isAuthentified, inputController.deleteInput);



