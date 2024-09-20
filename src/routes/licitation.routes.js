import { Router } from "express";
import * as licitationController from '../controllers/licitation.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as licitationMiddleware from '../middlewares/licitation.middleware.js'

export const router = Router();


router.post('/:id', authMiddleware.isAuthentified, licitationMiddleware.createLicitation, licitationController.createLicitation)

router.get('/me', authMiddleware.isAuthentified, licitationController.getLicitationsByUser)
router.get('/me/:id', authMiddleware.isAuthentified, licitationController.getLicitationsByUserAndProduct)
router.get('/', authMiddleware.isAuthentified, licitationController.getAllLicitations)
router.get('/:id', authMiddleware.isAuthentified, licitationController.getAllLicitationsByProduct)

router.put('/set-closed/:id', authMiddleware.isAuthentified, licitationController.closeLicitation)

router.delete('/:id', authMiddleware.isAuthentified, licitationController.deleteLicitation)
