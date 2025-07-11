import { Router } from "express";
import * as walletController from '../controllers/wallet.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as walletMiddleware from '../middlewares/wallet.middleware.js'

export const router = Router();

router.get('/cards', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.getCardsByUser);
router.post('/cards', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.createCardTokenization);
router.delete('/cards/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.deleteCard);
router.post('/cards/charge', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.chargeCard);
router.get('/', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.getWalletByUser);
router.post('/recharge', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletMiddleware.createRecharge, walletController.rechargeWallet);
router.post('/fee/:id_entrega', authMiddleware.isAuthentified, authMiddleware.isMultiuserPaymentAllowed, walletMiddleware.createFee, walletController.createFee);
router.get('/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserWalletAllowed, walletController.getWalletByUserId);


// By admin

router.post('/recharge/by-admin', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, walletController.rechargeWalletByAdmin);
router.post('/chargeback/by-admin', authMiddleware.isAuthentified, authMiddleware.isAdminAccount, walletController.chargebackWalletByAdmin);