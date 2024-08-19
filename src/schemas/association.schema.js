import Joi from "joi";

export const associationSchema = Joi.object({
  nombre: Joi.string().min(3).required()
});

