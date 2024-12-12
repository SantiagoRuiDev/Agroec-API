import { Router } from "express";
import * as suscriptionController from '../controllers/suscription.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/', authMiddleware.isAuthentified, suscriptionController.createSuscription)
router.post('/cancel', authMiddleware.isAuthentified, suscriptionController.cancelSuscription)
router.get('/plan', authMiddleware.isAuthentified, suscriptionController.getSuscriptionPlans)
router.get('/', authMiddleware.isAuthentified, suscriptionController.getSuscription)
