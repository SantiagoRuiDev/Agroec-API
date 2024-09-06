export const validateSchemas = (InputBuffer, Schema) => {
  const { error } = Schema.validate(InputBuffer, {
    messages: {
      "string.base": "{{#label}} debe ser de tipo texto",
      "string.empty": "{{#label}} no puede estar vacio",
      "string.min": "{{#label}} debe ser de al menos {{#limit}} caracteres",
      "number.min": "{{#label}} debe ser mayor que {{#limit}}",
      "string.email": "Ingresa un email valido",
      "string.pattern.base":
        "Tu contraseña debe contener al menos una mayuscula",
      "any.required": "{{#label}} es un campo requerido",
    },
  });
  if (error) {
    throw new Error(error.details[0].message);
  }
};