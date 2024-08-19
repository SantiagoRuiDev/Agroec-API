import Joi from "joi";

export const farmerSchema = Joi.object({
        type: Joi.string(),
        numero_hectareas: Joi.number().min(2).required(),
        cantidad_hectareas_siembras: Joi.number().min(2).required(),
        acceso_internet: Joi.number().min(1).required()
      });
