import { Router } from "express";
import * as warrantyController from "../controllers/warranty.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

export const router = Router();

router.get(
  "/",
  authMiddleware.isAuthentified,
  authMiddleware.isMultiuserWarrantiesAllowed,
  warrantyController.getWarrantyByUser
);
router.post(
  "/:id_condition",
  authMiddleware.isAuthentified,
  authMiddleware.isMultiuserWarrantyPaymentAllowed,
  warrantyController.createWarranty
);
router.put(
  "/:id",
  authMiddleware.isAuthentified,
  warrantyController.updateWarranty
);

