export const validateSchemas = (InputBuffer, Schema) => {
  const { error } = Schema.validate(InputBuffer, {
    messages: {
      "string.base": "{{#label}} should be a type of text",
      "string.empty": "{{#label}} cannot be empty",
      "string.min": "{{#label}} should have at least {{#limit}} characters",
      "string.email": "Please provide a valid email address",
      "string.pattern.base":
        "Password must contain at least one uppercase letter",
      "any.required": "{{#label}} is a required field",
    },
  });
  if (error) {
    throw new Error(error.details[0].message);
  }
};