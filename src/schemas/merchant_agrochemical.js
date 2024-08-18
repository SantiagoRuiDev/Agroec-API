import Joi from "joi";

export const merchantAgrochemicalSchema = Joi.object({
  type: Joi.string(),
  numero_hectareas: Joi.number().min(2).required(),
  cantidad_hectareas_siembras: Joi.number().min(1).required(),
  asociacion_id: Joi.number().min(1).required(),
 nueva_asociacion: Joi.string().min(2).required(),
  acceso_internet: Joi.number().min(1).required()
});

