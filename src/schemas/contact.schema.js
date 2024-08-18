import Joi from "joi";

export const contactSchema = Joi.object({
  nombre: Joi.string().min(2).required(),
  telefono: Joi.string().min(3).required(),
  correo: Joi.string().email().required(),
  cargo: Joi.string().min(2).required()
});

export const contactSchemaArray = Joi.array().items(contactSchema);