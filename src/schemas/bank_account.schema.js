import Joi from "joi";

export const bankAccount = Joi.object({
    tipo_de_cuenta: Joi.string().min(1).max(20).required(),
    numero_de_cuenta: Joi.string().min(1).max(35).required(),
    seleccionar_banco: Joi.string().min(1).max(40).required(),
    tipo_de_documento: Joi.string().min(1).required(),
    numero_de_documento: Joi.string().min(8).max(13).required(),
    nombre_del_propietario: Joi.string().min(1).max(50).required(),
});
