import { validateSchemas } from "../libs/schema.js";
import { decodeToken } from "../libs/token.js";
import { accountSchema } from "../schemas/account.schema.js";
import { authSchema } from "../schemas/auth.schema.js";
import { codeSchema } from "../schemas/code.schema.js";
import { buyerSchema } from "../schemas/buyer.schema.js";
import { bankAccount } from "../schemas/bank_account.schema.js";
import { contactSchemaArray } from "../schemas/contact.schema.js";

export const createAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body.user, accountSchema);

    // Se verifica que tipo de Perfil va a crear.

    // El campo req.body.profile.type, desde el frontend va a enviar el tipo "Comprador", "Agroquimicos", "Comerciante"

    switch(req.body.profile.type){
      case 'Comprador': 
        validateSchemas(req.body.profile, buyerSchema);
        break;
      default:
        throw new Error('Ingresa un tipo de Perfil Valido');
    }

    if(req.body.contact){
      validateSchemas(req.body.contact, contactSchemaArray);
    }

    if(req.body.bank_account){
      validateSchemas(req.body.bank_account, bankAccount);
    }

    return res.status(200).json(1)
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
