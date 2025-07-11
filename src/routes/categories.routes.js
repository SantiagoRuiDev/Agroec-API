import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as tutorialController from '../controllers/tutorials.controller.js'
import {upload, addFileUrl} from '../libs/images.js'

export const router = Router();

//Falta Middleware
router.get('/', authMiddleware.isAuthentified, tutorialController.getAllCategories)
router.post('/', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.createCategory)
router.put('/set-image/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, upload.single('image'), addFileUrl, tutorialController.setCategoryImage)
router.delete('/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, tutorialController.deleteCategory)