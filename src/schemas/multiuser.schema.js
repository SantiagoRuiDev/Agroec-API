import Joi from "joi";

export const multiuserSchema = Joi.object({
  nombre: Joi.string().required(),
  rol: Joi.string().required(),
  correo: Joi.string().email().required(),
  clave: Joi.string().required()
});
