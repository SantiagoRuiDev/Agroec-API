import Joi from "joi";

export const authSchema = Joi.object({
  correo: Joi.string().email().required(),
  clave: Joi.string().required()
});
