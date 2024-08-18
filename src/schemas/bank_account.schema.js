import Joi from "joi";

export const bankAccount = Joi.object({
    tipo_de_cuenta: Joi.string().min(3).required(),
    tipo_de_banco: Joi.string().min(3).required(),
});
