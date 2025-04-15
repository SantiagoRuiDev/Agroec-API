import { Router } from "express";
import * as suscriptionController from '../controllers/suscription.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/by-admin', authMiddleware.isAuthentified, suscriptionController.createSuscriptionByAdmin)
router.post('/plan', authMiddleware.isAuthentified, suscriptionController.createSuscriptionPlan)
router.post('/', authMiddleware.isAuthentified, suscriptionController.createSuscription)
router.post('/cancel', authMiddleware.isAuthentified, suscriptionController.cancelSuscription)
router.delete('/:id', authMiddleware.isAuthentified, suscriptionController.deleteSuscription)
router.get('/plan', authMiddleware.isAuthentified, suscriptionController.getSuscriptionPlans)
router.put('/change-status/:id', authMiddleware.isAuthentified, suscriptionController.updateSuscriptionStatus)
router.put('/plan/change-status/:id', authMiddleware.isAuthentified, suscriptionController.updatePlanStatus)
router.delete('/plan/:id', authMiddleware.isAuthentified, suscriptionController.deleteSuscriptionPlan)
router.get('/', authMiddleware.isAuthentified, suscriptionController.getSuscription)
router.get('/all', authMiddleware.isAuthentified, suscriptionController.getAllSuscriptions)
