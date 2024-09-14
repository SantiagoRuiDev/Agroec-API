import { Router } from "express";
import * as proposalController from '../controllers/proposal.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as proposalMiddleware from '../middlewares/proposal.middleware.js'

export const router = Router();

// Propuestas de Ventas a Licitaciones
router.post('/sale/decline/:id', authMiddleware.isAuthentified, proposalController.declineSaleProposal)
router.post('/sale/accept/:id', authMiddleware.isAuthentified, proposalController.acceptSaleProposal)
router.post('/sale/:id', authMiddleware.isAuthentified, proposalMiddleware.createSaleProposal, proposalController.createSaleProposal)
router.get('/sale/me', authMiddleware.isAuthentified, proposalController.getSaleProposalByUser)
router.get('/sale/:id', authMiddleware.isAuthentified, proposalController.getSaleProposalById)
router.get('/sale/product-filter/:id', authMiddleware.isAuthentified, proposalController.getSaleProposalByUserAndProduct)

// Propuestas de Compras a Ventas
router.post('/licitation/decline/:id', authMiddleware.isAuthentified, proposalController.declineLicitationProposal)
router.post('/licitation/accept/:id', authMiddleware.isAuthentified, proposalController.acceptLicitationProposal)
router.post('/licitation/:id', authMiddleware.isAuthentified, proposalMiddleware.createLicitationProposal, proposalController.createLicitationProposal)
router.get('/licitation/me', authMiddleware.isAuthentified, proposalController.getLicitationProposalByUser)
router.get('/licitation/:id', authMiddleware.isAuthentified, proposalController.getLicitationProposalById)
router.get('/licitation/product-filter/:id', authMiddleware.isAuthentified, proposalController.getLicitationProposalByUserAndProduct)

router.put('/condition/:id', authMiddleware.isAuthentified, proposalMiddleware.updateCondition, proposalController.updateCondition)