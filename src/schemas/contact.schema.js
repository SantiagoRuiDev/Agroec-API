import Joi from "joi";

export const contactSchema = Joi.object({
  nombre: Joi.string().min(0).required(),
  telefono: Joi.number().min(0).required(),
  correo: Joi.string().email().required(),
  cargo: Joi.string().min(0).required()
});

export const contactSchemaArray = Joi.array().items(contactSchema);