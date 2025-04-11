import { Router } from "express";
import * as walletController from '../controllers/wallet.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as walletMiddleware from '../middlewares/wallet.middleware.js'

export const router = Router();

router.get('/cards', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.getCardsByUser);
router.post('/cards', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.createCardTokenization);
router.delete('/cards/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.deleteCard);
router.post('/cards/charge', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.chargeCard);
router.get('/', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.getWalletByUser);
router.post('/recharge', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletMiddleware.createRecharge, walletController.rechargeWallet);
router.post('/fee/:id_entrega', authMiddleware.isAuthentified, authMiddleware.isMultiserPaymentAllowed, walletMiddleware.createFee, walletController.createFee);
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiserWalletAllowed, walletController.getWalletByUserId);


// By admin

router.post('/recharge/by-admin', authMiddleware.isAuthentified, walletController.rechargeWalletByAdmin);
router.post('/chargeback/by-admin', authMiddleware.isAuthentified, walletController.chargebackWalletByAdmin);