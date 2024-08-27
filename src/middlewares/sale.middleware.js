import { validateSchemas } from "../libs/schema.js";
import { saleSchema } from "../schemas/sale.schema.js";
import { qualityParamSchemaArray } from "../schemas/qualityParams.schema.js";

export const createSale = async (req, res, next) => {
  try {
    validateSchemas(req.body.sale, saleSchema);

    if (req.body.quality_params) {
      validateSchemas(req.body.quality_params, qualityParamSchemaArray);
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
