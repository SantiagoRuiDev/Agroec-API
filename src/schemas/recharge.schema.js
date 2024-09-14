import Joi from "joi";

export const rechargeWalletSchema = Joi.object({
  metodo_pago: Joi.string().min(1).required(),
  monto_recarga: Joi.number().min(1).required(),  
});
