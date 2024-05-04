import Joi from 'joi';

const passwordSchema = Joi.string().min(8).max(32).required();

const deleteAccountSchema = Joi.object({
  password: passwordSchema,
});

const validateDeleteAcount = (credentials: any) => {
  const { error, value } = deleteAccountSchema.validate(credentials);
  if (error) return { error: error.details[0].message };

  return { validCredentials: value };
};

export default validateDeleteAcount;
