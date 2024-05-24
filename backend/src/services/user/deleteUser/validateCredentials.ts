import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { UserCredentials } from '.';

const passwordSchema = Joi.string().min(8).max(32).required();

const deleteAccountSchema = Joi.object({
  password: passwordSchema,
});

const validateCredentials = (credentials: UserCredentials) => {
  const { error, value } = deleteAccountSchema.validate(credentials);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCredentials;
