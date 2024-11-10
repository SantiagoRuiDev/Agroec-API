import Joi from "joi";

export const pointsSchema = Joi.object({
  nombre: Joi.string().min(0).required(),
  ubicacion_google_maps: Joi.string().min(0).required(),
  direccion: Joi.string().required(),
});


export const pointsDeliverySchema = Joi.object({
  id: Joi.string().min(0).required(),
  nombre: Joi.string().min(0).required(),
  ubicacion_google_maps: Joi.string().min(0).required(),
  direccion: Joi.string().min(0).required(),
});

export const pointsSchemaArray = Joi.array().items(pointsSchema);