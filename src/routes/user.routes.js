import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as userController from '../controllers/user.controller.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, userController.getAll)
router.get('/:id', authMiddleware.isAuthentified, userController.getById)
router.put('/:id', authMiddleware.isAuthentified, authMiddleware.updateAccount, userController.updateById)
router.put('/set-state/:id', authMiddleware.isAuthentified, userController.setStateByUserId)
router.put('/set-input-permission/:id', authMiddleware.isAuthentified, userController.setInputPermissionByUserId)