import { Router } from "express";
import * as multiusersController from '../controllers/multiusers.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'

export const router = Router();

router.get('/roles', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiusersRoles)
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiuserById)
router.get('/', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiusersByUser)
router.delete('/:id', authMiddleware.isAuthentified, multiusersController.deleteMultiuser)
router.post('/', authMiddleware.isAuthentified, multiusersController.createMultiuser)
router.put('/:id', authMiddleware.isAuthentified, multiusersController.editMultiuser)
