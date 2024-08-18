import { validateSchemas } from "../libs/schema.js";
import { suggestionSchema } from "../schemas/suggestion.schema.js";

export const createAccount = async (req, res, next) => {
    try {
      validateSchemas(req.body, suggestionSchema);
  
      next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };