import Joi from "joi";

export const qualityParamSchema = Joi.object({
  nombre: Joi.string().required(),
  max: Joi.number().required(),
  min: Joi.number().required(),
});


export const qualityParamConditionSchema = Joi.object({
  id: Joi.string().min(0).required(),
  nombre: Joi.string().required(),
  max: Joi.number().required(),
  min: Joi.number().required(),
});

export const qualityParamSchemaArray = Joi.array().items(qualityParamSchema);
export const qualityParamConditionSchemaArray = Joi.array().items(qualityParamConditionSchema);