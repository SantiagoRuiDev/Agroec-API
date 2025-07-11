import { Router } from "express";
import * as walletController from "../controllers/wallet.controller.js";
import * as warrantyController from "../controllers/warranty.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
export const router = Router();

router.get(
  "/warranties",
  authMiddleware.isAuthentified,
  authMiddleware.isMultiuserWarrantiesAllowed,
  warrantyController.getAllWarranties
);
router.get(
  "/",
  authMiddleware.isAuthentified,
  authMiddleware.isMultiuserWalletAllowed,
  walletController.getAllTransactions
);
