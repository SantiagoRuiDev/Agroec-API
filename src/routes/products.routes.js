import { Router } from "express";
import * as productController from '../controllers/products.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import { addFileUrl, upload } from "../libs/images.js";

export const router = Router();

router.get('/price-analytics/:id', productController.getPriceAnalyticByProduct)
router.get('/', productController.getAllProducts)
router.get('/all', productController.getAllMarketProducts)
router.get('/:id', authMiddleware.isAuthentified, productController.getProductById)
router.post('/', authMiddleware.isAuthentified, productController.createProduct)
router.put('/:id', authMiddleware.isAuthentified, productController.updateProduct)
router.post('/set-unit/:id', authMiddleware.isAuthentified, productController.createUnit)
router.delete('/remove-unit/:id', authMiddleware.isAuthentified, productController.deleteUnit)
router.put('/set-image/:id', authMiddleware.isAuthentified, upload.single('product-image'), addFileUrl, productController.setProductImage)
router.put('/enable/:id', authMiddleware.isAuthentified, productController.enableProductById)
router.delete('/:id', authMiddleware.isAuthentified, productController.disableProductById)

// ENDPOINT CREAR PRODUCTO
// ENDPOINT ELIMINAR PRODUCTO