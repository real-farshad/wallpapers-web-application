import Joi from 'joi';

const passwordSchema = Joi.string().min(8).max(32).required();

const deleteAccountSchema = Joi.object({
  password: passwordSchema,
});

const validateDeleteAcount = (confirmation: any) => {
  const { error, value } = deleteAccountSchema.validate(confirmation);

  if (error) return { error: error.details[0].message };
  return { validConfirmation: value };
};

export { validateDeleteAcount };
