import { Router } from "express";
import * as walletController from '../controllers/wallet.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as walletMiddleware from '../middlewares/wallet.middleware.js'

export const router = Router();

router.get('/', authMiddleware.isAuthentified, walletController.getWalletByUser);
router.post('/recharge', authMiddleware.isAuthentified, walletMiddleware.createRecharge, walletController.rechargeWallet);
router.post('/fee/:id_entrega', authMiddleware.isAuthentified, walletMiddleware.createFee, walletController.createFee);

