import Joi from "joi";

export const codeSchema = Joi.object({
    codigo: Joi.string().min(8).max(10).required(),
});
