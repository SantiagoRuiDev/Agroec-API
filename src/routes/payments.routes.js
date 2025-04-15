import { Router } from "express";
import * as paymentsController from '../controllers/payments.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/:id', authMiddleware.isAuthentified, paymentsController.getPaymentsByUser);
router.delete('/:id', authMiddleware.isAuthentified, paymentsController.deletePaymentById);
router.post('/:id', authMiddleware.isPreAuthentified, paymentsController.createPaymentByUser);
