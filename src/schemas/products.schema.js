import Joi from "joi";

export const productSchema = Joi.object({
        nombre: Joi.string().min(3).required(),
        imagen: Joi.string().min(3).required(),
      });
