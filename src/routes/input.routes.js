import { Router } from "express";
import * as inputController from '../controllers/input.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as inputMiddleware from '../middlewares/input.middleware.js'
import {upload, addFileUrls, uploadTemp, addFileUrl} from '../libs/images.js'

export const router = Router();

router.get('/category', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.getInputCategories)
router.get('/me', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.getInputByCreatorId)
router.get('/:category', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.getAllInputs)
router.get('/details/:input_id', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.getInputById)
router.post('/', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputMiddleware.createInput, inputController.createInput)
router.post('/multiple', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, uploadTemp.single('input-sheet'), inputController.createMultipleInput)
router.delete('/remove-image/:input_id/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.deleteImage)
router.post('/set-images/:input_id', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, upload.array('input-image'), addFileUrls, inputController.insertImageInput)
router.put('/set-stock/:input_id', authMiddleware.isAuthentified, inputController.updateInputStockById)
router.put('/:input_id', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputMiddleware.createInput, inputController.updateInput)
router.delete('/:input_id', authMiddleware.isAuthentified, authMiddleware.isMultiuserInputsAllowed, inputController.deleteInput);

// Categories
router.post('/category/', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, inputController.createCategory)
router.put('/category/set-image/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, upload.single('image'), addFileUrl, inputController.setCategoryImage)
router.delete('/category/:id', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, inputController.deleteCategory)