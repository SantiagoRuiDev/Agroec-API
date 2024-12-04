import { validateSchemas } from "../libs/schema.js";
import { inputSchema } from "../schemas/input.schema.js";

export const createInput = async (req, res, next) => {
  try {
    validateSchemas(req.body, inputSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
