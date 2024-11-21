import Joi from "joi";

export const accountSchema = Joi.object({
  tipo_identificacion: Joi.string().min(3).required(),
  numero_identificacion: Joi.string().min(8).max(13).required(),
  correo: Joi.string().email().required(),
  clave: Joi.string().required(),
  provincia: Joi.string().min(3).required(),
  canton: Joi.string().min(3).required(),
  parroquia: Joi.string().min(0),
  acepto_terminos: Joi.bool().required(),
  direccion: Joi.string().min(3).required(),
  ubicacion: Joi.string().min(3).required(),
  telefono: Joi.string().min(3).required(),
});

export const accountUpdateSchema = Joi.object({
  tipo_identificacion: Joi.string().min(3).required(),
  numero_identificacion: Joi.string().min(8).max(13).required(),
  correo: Joi.string().email().required(),
  clave: Joi.string().min(0).required(),
  provincia: Joi.string().min(3).required(),
  canton: Joi.string().min(3).required(),
  parroquia: Joi.string().min(0),
  direccion: Joi.string().min(3).required(),
  ubicacion_google_maps: Joi.string().min(3).required(),
  telefono: Joi.string().min(3).required(),
});
