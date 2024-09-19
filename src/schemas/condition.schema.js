import Joi from "joi";
import { pointsDeliverySchema } from "./points.schema.js";

export const conditionSchema = Joi.object({
  id: Joi.string().min(0).required(),
  id_producto: Joi.string().min(0).required(),
  precio: Joi.number().min(1).required(),
  precio_unidad: Joi.string().min(2).max(2).required(),
  cantidad: Joi.number().min(1).required(),
  cantidad_unidad: Joi.string().min(2).max(2).required(),
  politicas_recepcion: Joi.string().min(0).required(),
  modo_pago: Joi.string().min(0).required(),
  porcentaje_inicial: Joi.number().min(0).max(100).required(),
  modo_pago_final: Joi.string().min(0).required(),
  porcentaje_final: Joi.number().min(0).max(100).required(),
  notas: Joi.string().min(0),
  precio_puesto_domicilio: Joi.boolean().required(),
});

export const deliverySchema = Joi.object({
  punto: pointsDeliverySchema,
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