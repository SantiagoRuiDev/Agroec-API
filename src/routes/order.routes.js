import { Router } from "express";
import * as orderController from '../controllers/order.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

// ORDENES ROUTES

router.get('/delivery-information/:id', orderController.getDeliveryInformationById)
router.get('/me', authMiddleware.isAuthentified, orderController.getOrdersByUser)
router.get('/:id', authMiddleware.isAuthentified, orderController.getOrdersById)
router.get('/pdf/:id', authMiddleware.isAuthentified, orderController.getOrderPDF)
router.get('/me/unpaid', authMiddleware.isAuthentified, orderController.getUnpaidOrders)
router.get('/me/undelivered', authMiddleware.isAuthentified, orderController.getUndeliveredOrders)
router.get('/', authMiddleware.isAuthentified, orderController.getAllOrders)
router.put('/set-date-delivery/:id', authMiddleware.isAuthentified, orderController.setOrderDeliveryDate);
router.put('/set-received/:id', authMiddleware.isAuthentified, orderController.setOrderReceivedStatus);
router.put('/set-rejected/:id', authMiddleware.isAuthentified, orderController.setOrderRejectedStatus);
router.put('/set-shipping/:id', authMiddleware.isAuthentified, orderController.setOrderShippedStatus);
router.put('/set-delivered/:id', authMiddleware.isAuthentified, orderController.setOrderDeliveredStatus);