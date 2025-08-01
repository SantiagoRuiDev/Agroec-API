import { Router } from "express";
import * as licitationController from '../controllers/licitation.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as licitationMiddleware from '../middlewares/licitation.middleware.js'
import * as ruler from '../middlewares/ruler.middleware.js';

export const router = Router();


router.post('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, ruler.checkNotReceivedOrders, licitationMiddleware.createLicitation, licitationController.createLicitation)
router.put('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, ruler.checkNotReceivedOrders, licitationMiddleware.createLicitation, licitationController.updateLicitation)

router.get('/me', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, licitationController.getLicitationsByUser)
router.get('/me/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, licitationController.getLicitationsByUserAndProduct)
router.get('/', authMiddleware.isAuthentified, licitationController.getAllLicitations)
router.get('/:id', authMiddleware.isAuthentified, licitationController.getLicitationById)

router.put('/set-closed/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, licitationController.closeLicitation)
router.put('/param/:id', authMiddleware.isAuthentified, licitationController.updateParam)

router.delete('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserLicitationsAllowed, licitationController.deleteLicitation)
