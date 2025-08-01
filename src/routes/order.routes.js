import { Router } from "express";
import * as orderController from '../controllers/order.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

// ORDENES ROUTES

router.get('/delivery-information/:id', orderController.getDeliveryInformationById)
router.get('/me', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrdersAllowed, orderController.getOrdersByUser)
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrdersAllowed, orderController.getOrdersById)
router.get('/pdf/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrdersAllowed, orderController.getOrderPDF)
router.get('/me/unpaid', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrdersAllowed, orderController.getUnpaidOrders)
router.get('/me/undelivered', authMiddleware.isAuthentified, orderController.getUndeliveredOrders)
router.get('/', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, orderController.getAllOrders)
router.put('/set-date-delivery/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrderStatusAllowed, orderController.setOrderDeliveryDate);
router.put('/set-received/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrderStatusAllowed, orderController.setOrderReceivedStatus);
router.put('/set-rejected/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrderStatusAllowed, orderController.setOrderRejectedStatus);
router.put('/set-shipping/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrderStatusAllowed, orderController.setOrderShippedStatus);
router.put('/set-delivered/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserOrderStatusAllowed, orderController.setOrderDeliveredStatus);