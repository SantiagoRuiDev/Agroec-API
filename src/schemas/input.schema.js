import Joi from "joi";

export const inputSchema = Joi.object({
  categoria_insumo: Joi.string().min(1).required(),
  nombre_comercial: Joi.string().min(1).required(),
  precio_agroec: Joi.number().min(0.1).required(),
  precio_mas_iva: Joi.number().min(0).max(1).required(),
  incluido_iva: Joi.number().min(0).max(1).required(),
  precio_punto_venta: Joi.number().min(0.1).required(),
  stock: Joi.number().min(0).required(),
  composicion: Joi.string().min(1).required(),
  clase: Joi.string().min(1).required(),
  tipo_formula: Joi.string().min(1).required(),
  titular: Joi.string().min(1).required(),
  clasificacion: Joi.string().min(1).required(),
  instrucciones_de_uso: Joi.string().min(1).required(),
  modo_aplicacion: Joi.string().min(1).required(),
  intervalo_entrada: Joi.string().min(1).required(),
  link: Joi.string().min(1).required(),
  atencion: Joi.string().min(1).required(),
});

export const inputMultipleSchema = Joi.object({
  categoria_insumo: Joi.string().min(1).required(),
  nombre_comercial: Joi.string().min(1).required(),
  precio_agroec: Joi.number().min(0.1).required(),
  precio_mas_iva: Joi.string().min(2).max(2).required(),
  incluido_iva: Joi.string().min(2).max(2).required(),
  precio_punto_venta: Joi.number().min(0.1).required(),
  stock: Joi.number().min(0).required(),
  composicion: Joi.string().min(1).required(),
  clase: Joi.string().min(1).required(),
  tipo_formula: Joi.string().min(1).required(),
  titular: Joi.string().min(1).required(),
  clasificacion: Joi.string().min(1).required(),
  instrucciones_de_uso: Joi.string().min(1).required(),
  modo_aplicacion: Joi.string().min(1).required(),
  intervalo_entrada: Joi.string().min(1).required(),
  link: Joi.string().min(1).required(),
  atencion: Joi.string().min(1).required(),
  imagen: Joi.string().min(1).required()
});


export const inputMultipleSchemaArray = Joi.array().items(inputMultipleSchema);
