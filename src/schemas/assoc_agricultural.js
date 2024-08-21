import Joi from "joi";

export const assocAgriculturalSchema = Joi.object({
  type: Joi.string(),
  nombre: Joi.string().min(3).required(),
  apellido: Joi.string().min(3).required(),
  centro_acopio: Joi.number().min(1).required(),
  capacidad_secado: Joi.number().min(2).required(),
  capacidad_almacenamiento: Joi.number().min(1).required(),
  capacidad: Joi.number().min(2).required(),
  numero_hectareas: Joi.number().min(2).required(),
  cantidad_hectareas_siembras: Joi.number().min(2).required(),
  acceso_internet: Joi.number().min(1).required()
});

