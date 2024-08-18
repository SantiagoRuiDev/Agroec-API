import Joi from "joi";

export const buyerSchema = Joi.object({
  type: Joi.string(),
  actividad_economica: Joi.string().min(3).required(),
  tipo_negocio: Joi.string().min(2).required(),
  consumo_mes_tm: Joi.number().required(),
  consumo_anual: Joi.number().required(),
  presupuesto_mes: Joi.number().required(),
  politicas_recepcion: Joi.string().required()
});
