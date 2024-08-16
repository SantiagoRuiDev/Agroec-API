import Joi from "joi";
import { validateSchemas } from "../libs/schema.js";

export const createAccount = async (req, res, next) => {
    try {
      const schema = Joi.object({
        producto: Joi.string().min(3).required(),
        cantidad: Joi.string().min(3).required(),
      });
  
      validateSchemas(req.body, schema);
  
      next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };