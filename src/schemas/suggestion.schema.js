import Joi from "joi";

export const suggestionSchema = Joi.object({
  producto: Joi.string().min(3).required(),
  cantidad: Joi.string().min(3).required(),
});
