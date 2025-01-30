import { Router } from "express";
import * as productController from '../controllers/products.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/price-analytics/:id', productController.getPriceAnalyticByProduct)
router.get('/', productController.getAllProducts)
router.get('/all', productController.getAllMarketProducts)
router.post('/', authMiddleware.isAuthentified, productController.createProduct)
router.delete('/:id', authMiddleware.isAuthentified, productController.deleteProductById)

// ENDPOINT CREAR PRODUCTO
// ENDPOINT ELIMINAR PRODUCTO