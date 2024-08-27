import { Router } from "express";
import * as saleController from '../controllers/sale.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as saleMiddleware from '../middlewares/sale.middleware.js'
import {upload, addFileUrls} from '../libs/images.js'

export const router = Router();


router.post('/:id', authMiddleware.isAuthentified, saleMiddleware.createSale, saleController.createSale)
router.post('/set-images/:id', authMiddleware.isAuthentified, upload.array('sale-image'), addFileUrls, saleController.insertImageSale)
router.get('/product/:id', authMiddleware.isAuthentified, saleController.getSalesByProduct)
router.get('/me', authMiddleware.isAuthentified, saleController.getSalesByUser)
router.get('/', authMiddleware.isAuthentified, saleController.getAllSales)
router.delete('/:id', authMiddleware.isAuthentified, saleController.deleteSale)
