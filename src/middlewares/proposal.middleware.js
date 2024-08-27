import { validateSchemas } from "../libs/schema.js";
import { saleProposalSchema, licitationProposalSchema } from "../schemas/proposal.schema.js";

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
