import { validateSchemas } from "../libs/schema.js";
import { buyerSchema } from "../schemas/buyer.schema.js";
import { bankAccount } from "../schemas/bank_account.schema.js";
import { farmerSchema } from "../schemas/farmer.schema.js";
import { contactProfileSchemaArray } from "../schemas/contact.schema.js";
import { merchantSchema } from "../schemas/merchant.schema.js";
import { assocAgriculturalSchema } from "../schemas/assoc_agricultural.js";
import { merchantAgrochemicalSchema } from "../schemas/merchant_agrochemical.js";
import { pointsDeliverySchemaArray } from "../schemas/points.schema.js";
import { associationSchema } from "../schemas/association.schema.js";

export const updateProfile = async (req, res, next) => {
  try {
    switch (req.body.profile.type) {
      case "Comprador":
        validateSchemas(req.body.profile, buyerSchema);
        break;
      case "Comerciante":
        validateSchemas(req.body.profile, merchantSchema);
        break;
      case "Agricultor":
        validateSchemas(req.body.profile, farmerSchema);
        break;
      case "Asociacion Agricola":
        validateSchemas(req.body.profile, assocAgriculturalSchema);
        break;
      case "Comerciante Agroquimico":
        validateSchemas(req.body.profile, merchantAgrochemicalSchema);
        break;
      default:
        throw new Error("Ingresa un tipo de Perfil Valido");
    }

    if (req.body.contact) {
      validateSchemas(req.body.contact, contactProfileSchemaArray);
    }

    if (req.body.points) {
      validateSchemas(req.body.points, pointsDeliverySchemaArray);
    }

    if (req.body.bank_account) {
      validateSchemas(req.body.bank_account, bankAccount);
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
