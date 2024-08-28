import Joi from "joi";

export const inputSchema = Joi.object({
      categoria_insumo: Joi.string().min(3).required(),
      nombre_comercial	: Joi.string().min(3).required(),
      precio_agroec: Joi.number().min(2).required(),
      precio_mas_iva: Joi.boolean().required(),
      incluido_iva: Joi.boolean().required(),
      precio_punto_venta: Joi.number().min(2).required(),
      stock: Joi.number().min(2).required(),
      composicion: Joi.string().min(3).required(), 
      clase: Joi.string().min(3).required(), 
      tipo_formula: Joi.string().min(3).required(), 
      titular: Joi.string().min(3).required(),
      clasificacion: Joi.string().min(3).required(),
      instrucciones_de_uso: Joi.string().min(3).required(), 
      epoca_intervalo: Joi.string().min(3).required(),
      intervalo_entrada: Joi.string().min(3).required(),
      link: Joi.string().min(3).required(),
      atencion: Joi.string().min(3).required(),
      });
