import { validateSchemas } from "../libs/schema.js";
import { decodeToken } from "../libs/token.js";
import { accountSchema, accountUpdateSchema } from "../schemas/account.schema.js";
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
import * as multiuserModel from '../models/multiusers.model.js';

export const updateAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body, accountUpdateSchema);

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body.user, accountSchema);

    // Se verifica que tipo de Perfil va a crear.

    // El campo req.body.profile.type, desde el frontend va a enviar el tipo "Comprador", "Agroquimicos", "Comerciante"

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
      validateSchemas(req.body.contact, contactSchemaArray);
    }

    if (req.body.points) {
      validateSchemas(req.body.points, pointsSchemaArray);
    }

    if (req.body.bank_account) {
      validateSchemas(req.body.bank_account, bankAccount);
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
    const multiuser_token = req.headers["x-multiuser-token"]; // Formato esperado: "Bearer <multiuser-token>"

    if (
      multiuser_token != undefined && multiuser_token != null
    ) {
      if (typeof multiuser_token === "string") {
        const decoded = decodeToken(multiuser_token);
  
        if (decoded instanceof Object) {
          req.user_id = decoded.user;
          req.multiuser_id = decoded.multiuser;
        }
        req.permissions = await multiuserModel.getMultiuserRoleByUser(decoded.multiuser);
        req.token = decoded;
        next();
        return;
      } else {
        throw new Error("Please insert a valid token");
      }
    }

    // Si el usuario se ingreso como multi-usuario, este flujo de abajo no seguira, entonces creamos middleware para cada permiso.

    const token = req.headers["authorization"]?.split(" ")[1];

    if (typeof token === "string") {
      const decoded = decodeToken(token);

      if (decoded instanceof Object) {
        req.user_id = decoded.user;
      }
      req.token = decoded;
      next();
    } else {
      throw new Error("Please insert a valid token");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiserDashboardAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_dashboard > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};


export const isMultiserTalksAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_negociaciones > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiserLicitationsAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_licitaciones > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiserAcceptOrdersAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_aceptar_pedido > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiserReceiveOrdersAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_recibir_pedido > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};



export const isMultiserRejectOrdersAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_rechazar_pedido > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};



export const isMultiserPaymentAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }

    if(req.permissions.permiso_pagar > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};



export const isMultiserWalletAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }

    if(req.permissions.permiso_billetera > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};


export const isMultiserManagmentAllowed = async (req, res, next) => {
  try {
    if(req.permissions == undefined || req.permissions == null){
      next();
      return;
    }
    
    if(req.permissions.permiso_usuarios > 0){
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
