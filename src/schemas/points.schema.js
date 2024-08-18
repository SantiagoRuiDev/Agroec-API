import Joi from "joi";

export const pointsSchema = Joi.object({
  nombre: Joi.string().min(2).required(),
  ubicacion_google_maps: Joi.string().min(3).required(),
  direccion: Joi.string().required(),
});

export const pointsSchemaArray = Joi.array().items(pointsSchema);