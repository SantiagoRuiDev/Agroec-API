import Joi from "joi";

export const feeSchema = Joi.object({
    monto_fee: Joi.number().min(1).required()
});
