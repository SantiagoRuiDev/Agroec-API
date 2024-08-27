import { validateSchemas } from "../libs/schema.js";
import { licitationSchema } from "../schemas/licitation.schema.js";
import { qualityParamSchemaArray } from "../schemas/qualityParams.schema.js";

export const createLicitation = async (req, res, next) => {
  try {
    validateSchemas(req.body.licitation, licitationSchema);

    if (req.body.quality_params) {
      validateSchemas(req.body.quality_params, qualityParamSchemaArray);
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
