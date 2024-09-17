import { Router } from "express";
import * as tutorialController from '../controllers/tutorials.controller.js'

export const router = Router();

router.get('/', tutorialController.getAllCategories)
router.get('/tutorials/:category', tutorialController.getTutorialsByCategories);
