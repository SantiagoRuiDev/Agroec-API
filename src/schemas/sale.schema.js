import Joi from "joi";

export const saleSchema = Joi.object({
  precio: Joi.number().min(1).required(),
  precio_unidad: Joi.string().min(2).max(2).required(),
  cantidad: Joi.number().min(1).required(),
  cantidad_unidad: Joi.string().min(2).max(2).required(),
  presentacion_entrega: Joi.string().required(),
  fecha_entrega: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).message('Valida Hasta debera estar en formato YYYY-MM-DD.').required(),
});
