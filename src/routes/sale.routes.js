import { Router } from "express";
import * as saleController from '../controllers/sale.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as saleMiddleware from '../middlewares/sale.middleware.js'
import {upload, addFileUrls} from '../libs/images.js'

export const router = Router();


router.get('/me/:id', authMiddleware.isAuthentified, saleController.getSaleByIdentifier);
router.get('/me', authMiddleware.isAuthentified, saleController.getSalesByUser);
router.post('/:id', authMiddleware.isAuthentified, saleMiddleware.createSale, saleController.createSale)
router.put('/:id', authMiddleware.isAuthentified, saleMiddleware.updateSale, saleController.updateSale)
router.post('/set-images/:id', authMiddleware.isAuthentified, upload.array('sale-image'), addFileUrls, saleController.insertImageSale)
router.get('/:id/:sale', authMiddleware.isAuthentified, saleController.getSaleByIdentifierAndProduct)
router.get('/:id', authMiddleware.isAuthentified, saleController.getSalesByProduct)
router.get('/', authMiddleware.isAuthentified, saleController.getAllSales)
router.delete('/:id', authMiddleware.isAuthentified, saleController.deleteSale)
router.delete('/remove-param/:sale/:id', authMiddleware.isAuthentified, saleController.deleteParam)
router.delete('/remove-image/:sale/:id', authMiddleware.isAuthentified, saleController.deleteImage)
