import Joi from "joi";

export const productSchema = Joi.object({
        nombre: Joi.string().min(1).required(),
        imagen: Joi.string().min(1).required(),
      });
