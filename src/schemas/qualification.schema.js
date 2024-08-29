import Joi from "joi";

export const qualificationSchema = Joi.object({
    puntaje: Joi.number().required(),
});
