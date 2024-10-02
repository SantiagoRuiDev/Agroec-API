import { Router } from "express";
import * as inputController from '../controllers/input.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/category', authMiddleware.isAuthentified, inputController.getInputCategories)
router.get('/me', authMiddleware.isAuthentified, inputController.getInputByCreatorId)
router.get('/:category', authMiddleware.isAuthentified, inputController.getAllInputs)
router.get('/details/:input_id', authMiddleware.isAuthentified, inputController.getInputById)
router.post('/', authMiddleware.isAuthentified, inputController.createInput)
router.put('/:input_id', authMiddleware.isAuthentified, inputController.updateInput)
router.delete('/:input_id', authMiddleware.isAuthentified, inputController.deleteInput);



