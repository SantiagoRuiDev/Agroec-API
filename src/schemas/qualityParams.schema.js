import Joi from "joi";

export const qualityParamSchema = Joi.object({
  nombre: Joi.string().required(),
  max: Joi.number().required(),
  min: Joi.number().required(),
});

export const qualityParamSchemaArray = Joi.array().items(qualityParamSchema);