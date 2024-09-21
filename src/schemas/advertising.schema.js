import Joi from "joi";

export const advertisingSchema = Joi.object({
  nombre: Joi.string().min(1).required(),
  url: Joi.string().min(1).required(),
});
