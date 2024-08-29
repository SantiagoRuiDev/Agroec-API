import { Router } from "express";
import * as qualificationController from '../controllers/qualification.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/:id', authMiddleware.isAuthentified, qualificationController.createQualification)
router.get('/:id', authMiddleware.isAuthentified, qualificationController.getQualificationUserSession)
router.get('/:id', authMiddleware.isAuthentified, qualificationController.getQualificationByUserId)
router.put('/:id', authMiddleware.isAuthentified, qualificationController.updateQualification)




