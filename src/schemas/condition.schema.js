import Joi from "joi";

export const conditionSchema = Joi.object({
  precio: Joi.number().min(1).required(),
  precio_unidad: Joi.string().min(2).max(2).required(),
  cantidad: Joi.number().min(1).required(),
  cantidad_unidad: Joi.string().min(2).max(2).required(),
  modo_pago: Joi.string().required(),
  notas: Joi.string(),
  precio_puesto_domicilio: Joi.boolean().required(),
});

export const warrantySchema = Joi.object({
  porcentaje_inicial: Joi.number().min(1).max(100).required(),
  modo_pago_final: Joi.string().required(),
  porcentaje_final: Joi.number().min(1).max(100).required(),
});

export const deliverySchema = Joi.object({
  id_punto: Joi.string().required(),
  cantidad: Joi.number().min(1).required(),
  cantidad_unidad: Joi.string().min(2).max(2).required(),
  fecha_entrega: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .message("Valida Hasta debera estar en formato YYYY-MM-DD.")
    .required(),
  hora_entrega: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .message("Hora Entrega debera estar en formato HH-MM.")
    .required(),
});


export const deliverySchemaArray = Joi.array().items(deliverySchema);