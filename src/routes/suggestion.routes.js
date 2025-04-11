import { Router } from "express";
import * as suggestionController from '../controllers/suggestion.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/', authMiddleware.isAuthentified, suggestionController.createSuggestion)
router.get('/', authMiddleware.isAuthentified, suggestionController.getSuggestions)
router.get('/products', authMiddleware.isAuthentified, suggestionController.getProducts)
router.put('/products/enable/:id', authMiddleware.isAuthentified, suggestionController.enableProductById)
router.delete('/products/:id', authMiddleware.isAuthentified, suggestionController.disableProductById)

// ENDPOINT LISTAR SUGERENCIAS