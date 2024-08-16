import Joi from "joi";
import { validateSchemas } from "../libs/schema.js";
import { decodeToken } from "../libs/token.js";

export const createAccount = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nombre: Joi.string().min(3).required(),
      apellido: Joi.string().min(3).required(),
      tipo_identificacion: Joi.string().min(3).required(),
      numero_identificacion: Joi.string().min(3).required(),
      correo: Joi.string().email().required(),
      clave: Joi.string().required(),
      provincia: Joi.string().min(3).required(),
      canton: Joi.string().min(3).required(),
      acepto_terminos: Joi.bool().required(),
      direccion: Joi.string().min(3).required(),
      ubicacion: Joi.string().min(3).required(),
      telefono: Joi.string().min(3).required(),
    });

    validateSchemas(req.body, schema);

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const loginAccount = async (req, res, next) => {
  try {
    const schema = Joi.object({
      correo: Joi.string().email().required(),
      clave: Joi.string().required(),
    });

    validateSchemas(req.body, schema);

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const finishAccount = async (req, res, next) => {
  try {
    const schema = Joi.object({
      codigo: Joi.string().min(10).max(10).required(),
    });

    validateSchemas(req.body, schema);

    next();
  } catch (error) {
    return res.status(400).json(error.message);
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
