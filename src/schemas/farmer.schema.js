import Joi from "joi";

export const farmerSchema = Joi.object({
  type: Joi.string(),
  nombre: Joi.string().min(1).required(),
  numero_hectareas: Joi.number().min(1).required(),
  cantidad_hectareas_siembra: Joi.number().min(1).required(),
  id_asociacion: Joi.string().min(1).required(),
  acceso_internet: Joi.number().min(0).max(1).required(),
});
