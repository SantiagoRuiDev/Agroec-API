import { Router } from "express";
import * as inputController from '../controllers/input.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as inputMiddleware from '../middlewares/input.middleware.js'
import {upload, addFileUrls, uploadTemp} from '../libs/images.js'

export const router = Router();

router.get('/category', authMiddleware.isAuthentified, inputController.getInputCategories)
router.get('/me', authMiddleware.isAuthentified, inputController.getInputByCreatorId)
router.get('/:category', authMiddleware.isAuthentified, inputController.getAllInputs)
router.get('/details/:input_id', authMiddleware.isAuthentified, inputController.getInputById)
router.post('/', authMiddleware.isAuthentified, inputMiddleware.createInput, inputController.createInput)
router.post('/multiple', authMiddleware.isAuthentified, uploadTemp.single('input-sheet'), inputController.createMultipleInput)
router.delete('/remove-image/:input_id/:id', authMiddleware.isAuthentified, inputController.deleteImage)
router.post('/set-images/:input_id', authMiddleware.isAuthentified, upload.array('input-image'), addFileUrls, inputController.insertImageInput)
router.put('/:input_id', authMiddleware.isAuthentified, inputMiddleware.createInput, inputController.updateInput)
router.delete('/:input_id', authMiddleware.isAuthentified, inputController.deleteInput);



