import Joi from "joi";

export const merchantSchema = Joi.object({
        type: Joi.string(),
        centro_acopio: Joi.number().required(),
        capacidad_secado: Joi.number().required(),
        capacidad_almacenamiento: Joi.number().required(),
        capacidad: Joi.number().required(),
        acceso_internet: Joi.number().required()
      });

