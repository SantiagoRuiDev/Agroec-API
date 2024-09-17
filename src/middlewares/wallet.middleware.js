import { validateSchemas } from "../libs/schema.js";
import { rechargeSchema, feeSchema } from "../schemas/wallet.schema.js";

export const createRecharge = async (req, res, next) => {
  try {
    validateSchemas(req.body, rechargeSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createFee = async (req, res, next) => {
    try {
      validateSchemas(req.body, feeSchema);
  
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  