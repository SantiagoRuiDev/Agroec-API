import { validateSchemas } from "../libs/schema.js";
import { multiuserSchema } from "../schemas/multiuser.schema.js";

export const createMultiuser = async (req, res, next) => {
  try {
    validateSchemas(req.body, multiuserSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
