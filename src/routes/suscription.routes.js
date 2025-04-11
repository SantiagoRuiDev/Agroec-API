import { Router } from "express";
import * as suscriptionController from '../controllers/suscription.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/by-admin', authMiddleware.isAuthentified, suscriptionController.createSuscriptionByAdmin)
router.post('/plan', authMiddleware.isAuthentified, suscriptionController.createSuscriptionPlan)
router.post('/', authMiddleware.isAuthentified, suscriptionController.createSuscription)
router.post('/cancel', authMiddleware.isAuthentified, suscriptionController.cancelSuscription)
router.get('/plan', authMiddleware.isAuthentified, suscriptionController.getSuscriptionPlans)
router.put('/plan/change-status/:id', authMiddleware.isAuthentified, suscriptionController.updatePlanStatus)
router.delete('/plan/:id', authMiddleware.isAuthentified, suscriptionController.deleteSuscriptionPlan)
router.get('/', authMiddleware.isAuthentified, suscriptionController.getSuscription)
