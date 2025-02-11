import Joi from "joi";

export const assocAgriculturalSchema = Joi.object({
  type: Joi.string(),
  nombre: Joi.string().min(1).required(),
  centro_acopio: Joi.number().min(0).max(1).required(),
  capacidad_secado: Joi.number().min(0).required(),
  capacidad_almacenamiento: Joi.number().min(0).max(1).required(),
  capacidad: Joi.number().min(0).required(),
  numero_hectareas: Joi.number().min(0).required(),
  cantidad_hectareas_siembra: Joi.number().min(0).required(),
  acceso_internet: Joi.number().min(0).max(1).required()
});

