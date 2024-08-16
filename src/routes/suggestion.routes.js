import { Router } from "express";
import * as suggestionController from '../controllers/suggestion.controller.js'

export const router = Router();

router.post('/', suggestionController.createSuggestion)

