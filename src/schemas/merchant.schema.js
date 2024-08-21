import Joi from "joi";

export const merchantSchema = Joi.object({
        type: Joi.string(),
        nombre: Joi.string().min(3).required(),
        apellido: Joi.string().min(3).required(),
        centro_acopio: Joi.number().min(1).required(),
        capacidad_secado: Joi.number().min(1).required(),
        capacidad_almacenamiento: Joi.number().min(1).required(),
        capacidad: Joi.number().min(1).required(),
        acceso_internet: Joi.number().min(1).required()
      });
