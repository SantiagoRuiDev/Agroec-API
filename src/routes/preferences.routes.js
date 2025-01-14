import { Router } from "express";
import * as preferencesController from '../controllers/preferences.controller.js'
import { addFileUrl, upload } from '../libs/sheets.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, preferencesController.getAllPreferences);
router.post('/', authMiddleware.isPreAuthentified, preferencesController.createPreferencesByUser);
router.post('/:id', authMiddleware.isPreAuthentified, upload.single('sheet'), addFileUrl, preferencesController.uploadSheet);
