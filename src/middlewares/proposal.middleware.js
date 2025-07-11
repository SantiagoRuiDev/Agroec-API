import { validateSchemas } from "../libs/schema.js";
import { saleProposalSchema, licitationProposalSchema } from "../schemas/proposal.schema.js";
import { qualityParamConditionSchemaArray, qualityParamSchemaArray } from "../schemas/qualityParams.schema.js";
import { deliverySchemaArray, conditionSchema } from "../schemas/condition.schema.js";

export const createSaleProposal = async (req, res, next) => {
  try {
    validateSchemas(req.body, saleProposalSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createLicitationProposal = async (req, res, next) => {
  try {
    validateSchemas(req.body, licitationProposalSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCondition = async (req, res, next) => {
  try {
    if(!req.body.condition){
      throw new Error("Ingresa todos los campos de la condición");
    }
    
    validateSchemas(req.body.condition, conditionSchema);

    if (req.body.quality_params) {
      validateSchemas(req.body.quality_params, qualityParamConditionSchemaArray);
    }

    if(req.body.delivery){
      validateSchemas(req.body.delivery, deliverySchemaArray);
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
