import { validateSchemas } from "../libs/schema.js";
import { decodeToken } from "../libs/token.js";
import {
  accountSchema,
  accountUpdateSchema,
} from "../schemas/account.schema.js";
import { authAdminSchema, authSchema } from "../schemas/auth.schema.js";
import { codeSchema } from "../schemas/code.schema.js";
import { buyerSchema } from "../schemas/buyer.schema.js";
import { bankAccount } from "../schemas/bank_account.schema.js";
import { farmerSchema } from "../schemas/farmer.schema.js";
import { contactSchemaArray } from "../schemas/contact.schema.js";
import { merchantSchema } from "../schemas/merchant.schema.js";
import { assocAgriculturalSchema } from "../schemas/assoc_agricultural.js";
import { merchantAgrochemicalSchema } from "../schemas/merchant_agrochemical.js";
import { pointsSchemaArray } from "../schemas/points.schema.js";
import * as multiuserModel from "../models/multiusers.model.js";

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
      case "Asociación Agrícola":
        validateSchemas(req.body.profile, assocAgriculturalSchema);
        break;
      case "Agroquimicos":
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
      if (!/^\d+$/.test(req.body.bank_account.numero_de_cuenta)) {
        return res.status(400).json({
          error: "El campo numero de cuenta solo debe contener números",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginAdminAccount = async (req, res, next) => {
  try {
    validateSchemas(req.body, authAdminSchema);

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

    if (multiuser_token != undefined && multiuser_token != null) {
      if (typeof multiuser_token === "string") {
        const decoded = decodeToken(multiuser_token);

        if (decoded instanceof Object) {
          req.user_id = decoded.user;
          req.multiuser_id = decoded.multiuser;
        }
        req.permissions = await multiuserModel.getMultiuserRoleByUser(
          decoded.multiuser
        );
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
      return res.status(401).json({ error: error.message });
    }
  }
};

export const isPreAuthentified = async (req, res, next) => {
  try {
    const multiuser_token = req.headers["x-multiuser-token"]; // Formato esperado: "Bearer <multiuser-token>"

    if (multiuser_token != undefined && multiuser_token != null) {
      if (typeof multiuser_token === "string") {
        const decoded = decodeToken(multiuser_token);

        if (decoded instanceof Object) {
          req.user_id = decoded.user;
          req.multiuser_id = decoded.multiuser;
        }
        req.permissions = await multiuserModel.getMultiuserRoleByUser(
          decoded.multiuser
        );
        req.token = decoded;
        next();
        return;
      } else {
        if (req.body.id) {
          next();
          return;
        }
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
      if (req.body.id) {
        next();
        return;
      }
      throw new Error("Please insert a valid token");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserProfileAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_perfil > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al perfil");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};


export const isMultiuserDashboardAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_gestion > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder a la dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserAcceptProposalsAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_aceptar_propuesta > 0) {
      next();
      return;
    }

    throw new Error("No puedes aceptar una propuesta");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserSendProposalsAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_enviar_propuesta > 0) {
      next();
      return;
    }

    throw new Error("No puedes enviar una propuesta");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserLicitationsAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_licitaciones > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para gestionar las licitaciones");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserOrderStatusAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_estados_finales > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para gestionar estados");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserWarrantyPaymentAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_pagar_garantia > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar pagos");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserPaymentAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_pagar > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para realizar pagos");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserInputsAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_insumos > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al modulo insumos");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserNotificationsAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_notificaciones > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al modulo notificaciones");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserInterestProducts = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.permiso_productos_interes > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para modificar los productos de interes");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserWalletAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_billetera > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al modulo billetera");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserWarrantiesAllowed = async (req, res, next) => {
  try {
    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_garantias > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al modulo garantias");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const isMultiuserManagmentAllowed = async (req, res, next) => {
  try {
    if (req.user_id == "Sistema") {
      next();
      return;
    }

    if (req.permissions == undefined || req.permissions == null) {
      next();
      return;
    }

    if (req.permissions.modulo_multiusuarios > 0) {
      next();
      return;
    }

    throw new Error("No tienes permiso para acceder al modulo multiusuarios");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};


export const isAdminAccount = async (req, res, next) => {
  try {
    if (req.user_id == "Sistema") {
      next();
      return;
    }

    throw new Error("No tienes permisos para realizar esta acción");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
