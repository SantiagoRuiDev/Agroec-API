import Joi from "joi";

export const merchantAgrochemicalSchema = Joi.object({
  type: Joi.string(),
  nombre: Joi.string().min(3).required(),
  apellido: Joi.string().min(3).required(),
  numero_hectareas: Joi.number().min(2).required(),
  cantidad_hectareas_siembras: Joi.number().min(1).required(),
  acceso_internet: Joi.number().min(1).required(),
});
