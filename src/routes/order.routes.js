import { Router } from "express";
import * as orderController from '../controllers/order.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

// ORDENES ROUTES

router.get('/me', authMiddleware.isAuthentified, orderController.getOrdersByUser)
router.get('/:id', authMiddleware.isAuthentified, orderController.getOrdersById)