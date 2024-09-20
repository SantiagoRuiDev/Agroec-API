import { Router } from "express";
import * as suggestionController from '../controllers/suggestion.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.post('/', authMiddleware.isAuthentified, suggestionController.createSuggestion)

// ENDPOINT LISTAR SUGERENCIAS