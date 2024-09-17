import Joi from "joi";

export const rechargeSchema = Joi.object({
  metodo_pago: Joi.string().required(),
  monto_recarga: Joi.number().min(1).required(),  
});


export const feeSchema = Joi.object({
    monto_fee: Joi.number().min(1).required()
});