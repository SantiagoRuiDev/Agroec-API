import { Router } from "express";
import * as proposalController from '../controllers/proposal.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as proposalMiddleware from '../middlewares/proposal.middleware.js'
import * as ruler from '../middlewares/ruler.middleware.js';

export const router = Router();

router.get('/:id', authMiddleware.isAuthentified, proposalController.getProposalInformation)
router.post('/accept/:id', authMiddleware.isAuthentified, ruler.checkAccountStatus, authMiddleware.isMultiuserAcceptProposalsAllowed, proposalController.acceptProposalByConditions)
router.post('/reject/:id', authMiddleware.isAuthentified, ruler.checkAccountStatus, authMiddleware.isMultiuserAcceptProposalsAllowed, proposalController.rejectProposalByConditions)

// Propuestas de Ventas a Licitaciones
router.post('/sale/:id', authMiddleware.isAuthentified, ruler.checkPendingOrders, proposalMiddleware.createSaleProposal, proposalController.createSaleProposal)
router.get('/sale/me', authMiddleware.isAuthentified, proposalController.getSaleProposalByUser)
router.get('/sale/:id', authMiddleware.isAuthentified, proposalController.getSaleProposalById)
router.get('/sale/product-filter/:id', authMiddleware.isAuthentified, proposalController.getSaleProposalByUserAndProduct)

// Propuestas de Compras a Ventas
router.post('/licitation/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserSendProposalsAllowed, ruler.checkNotReceivedOrders, proposalMiddleware.createLicitationProposal, proposalController.createLicitationProposal)
router.get('/licitation/me', authMiddleware.isAuthentified, proposalController.getLicitationProposalByUser)
router.get('/licitation/:id', authMiddleware.isAuthentified, proposalController.getLicitationProposalById)
router.get('/licitation/product-filter/:id', authMiddleware.isAuthentified, proposalController.getLicitationProposalByUserAndProduct)

router.put('/condition/:id', authMiddleware.isAuthentified, proposalMiddleware.updateCondition, proposalController.updateCondition)
router.delete('/condition/remove-delivery/:id', authMiddleware.isAuthentified, proposalController.deleteDelivery)
router.delete('/condition/remove-param/:id', authMiddleware.isAuthentified, proposalController.deleteParam)
router.put('/condition/delivery/:id', authMiddleware.isAuthentified, proposalController.updateDelivery)
router.put('/condition/param/:id', authMiddleware.isAuthentified, proposalController.updateParam)