import { validateSchemas } from "../libs/schema.js";
import { decodeToken } from "../libs/token.js";
import { accountSchema } from "../schemas/account.schema.js";
import { authSchema } from "../schemas/auth.schema.js";
import { codeSchema } from "../schemas/code.schema.js";
import { buyerSchema } from "../schemas/buyer.schema.js";
import { bankAccount } from "../schemas/bank_account.schema.js";
import { farmerSchema } from "../schemas/farmer.schema.js";
import { contactSchemaArray } from "../schemas/contact.schema.js";
import { merchantSchema } from "../schemas/merchant.schema.js";
import { assocAgriculturalSchema } from "../schemas/assoc_agricultural.js";
import { merchantAgrochemicalSchema } from "../schemas/merchant_agrochemical.js";
import { pointsSchemaArray } from "../schemas/points.schema.js";
import { associationSchema } from "../schemas/association.schema.js";

export const createAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body.user, accountSchema);

    // Se verifica que tipo de Perfil va a crear.

    // El campo req.body.profile.type, desde el frontend va a enviar el tipo "Comprador", "Agroquimicos", "Comerciante"

    switch(req.body.profile.type){
      case 'Comprador': 
        validateSchemas(req.body.profile, buyerSchema);
        break;
        case 'Comerciante': 
        validateSchemas(req.body.profile, merchantSchema);
        break;
        case 'Agricultor': 
        validateSchemas(req.body.profile, farmerSchema);
        break;
        case 'Asociacion Agricola': 
        validateSchemas(req.body.profile, assocAgriculturalSchema);
        break;
        case 'Comerciante Agroquimico': 
        validateSchemas(req.body.profile, merchantAgrochemicalSchema);
        break;

      default:
        throw new Error('Ingresa un tipo de Perfil Valido');
    }

    if(req.body.contact){
      validateSchemas(req.body.contact, contactSchemaArray);
    }

    if(req.body.points){
      validateSchemas(req.body.points, pointsSchemaArray);
    }

    if(req.body.bank_account){
      validateSchemas(req.body.bank_account, bankAccount);
    }

    if(req.body.association){
      validateSchemas(req.body.association, associationSchema);
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body, authSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const finishAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body, codeSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const isAuthentified = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];

    if (typeof token === "string") {
      const decoded = decodeToken(token);

      if (decoded instanceof Object) {
        req.user_id = decoded.user;
      }
      next();
    } else {
      throw new Error("Please insert a valid token");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
