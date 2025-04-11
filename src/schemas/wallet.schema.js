import Joi from "joi";

export const rechargeSchema = Joi.object({
  metodo_pago: Joi.string().required(),
  monto_recarga: Joi.number().min(1).required(),  
  identificador: Joi.string().min(0),
  documento: Joi.number().min(0)
});


export const feeSchema = Joi.object({
    price: Joi.number().min(0.1).required(),
    quantity: Joi.number().min(1).required()
});