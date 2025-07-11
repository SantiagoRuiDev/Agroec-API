import { Router } from "express";
import * as paymentsController from '../controllers/payments.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, paymentsController.getPaymentsByLoggedUser);
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, paymentsController.getPaymentsByUser);
router.delete('/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, paymentsController.deletePaymentById);
router.post('/:id', authMiddleware.isPreAuthentified, authMiddleware.isAdminAccount, paymentsController.createPaymentByUser);
