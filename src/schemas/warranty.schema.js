import Joi from "joi";

export const warrantySchema = Joi.object({
  metodo_pago: Joi.string().min(1).required(),
});
