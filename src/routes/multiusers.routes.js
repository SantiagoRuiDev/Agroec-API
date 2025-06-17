import { Router } from "express";
import * as multiusersController from '../controllers/multiusers.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as multiuserMiddleware from '../middlewares/multiuser.middleware.js'

export const router = Router();

router.delete('/roles/:id', authMiddleware.isAuthentified, multiusersController.deleteRole)
router.put('/roles/:id', authMiddleware.isAuthentified, multiusersController.updateRole)
router.post('/roles', authMiddleware.isAuthentified, multiusersController.createRole)
router.get('/roles/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getRoleById)
router.get('/roles', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiusersRoles)
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiuserById)
router.get('/', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiusersController.getMultiusersByUser)
router.delete('/:id', authMiddleware.isAuthentified, multiusersController.deleteMultiuser)
router.post('/', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiuserMiddleware.createMultiuser, multiusersController.createMultiuser)
router.put('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserManagmentAllowed, multiuserMiddleware.createMultiuser, multiusersController.editMultiuser)
