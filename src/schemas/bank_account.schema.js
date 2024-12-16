import Joi from "joi";

export const bankAccount = Joi.object({
    tipo_de_cuenta: Joi.string().min(1).required(),
    numero_de_cuenta: Joi.number().min(1).required(),
    seleccionar_banco: Joi.string().min(1).required(),
    tipo_de_documento: Joi.string().min(1).required(),
    numero_de_documento: Joi.number().min(1).required(),
    nombre_del_propietario: Joi.string().min(1).required(),
});
