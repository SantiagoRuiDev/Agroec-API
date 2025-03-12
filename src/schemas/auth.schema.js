import Joi from "joi";

export const authSchema = Joi.object({
  correo: Joi.string().email().required(),
  clave: Joi.string().required()
});

export const authAdminSchema = Joi.object({
  correo: Joi.string().required(),
  clave: Joi.string().required()
});
